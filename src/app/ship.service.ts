import { computed, DestroyRef, effect, inject, Service, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { editions } from './data/editions';
import { Level, MenuShip, Race, Ship } from './data/types';
import { SHEET_TYPE } from './constants';

import { races as racesPP } from './data/pp/races';
import { levels as levelsPP } from './data/pp/levels';
import { races as races2e } from './data/2e/races';
import { levels as levels2e } from './data/2e/levels';
import { races as racesAr } from './data/armageddon/races';
import { levels as levelsAr } from './data/armageddon/levels';
import { races as racesDW } from './data/dilgar-war/races';
import { levels as levelsDW } from './data/dilgar-war/levels';
import { races as racesDR } from './data/darkness-rising/races';
import { levels as levelsDR } from './data/darkness-rising/levels';

@Service()
export class ShipService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  editionName = signal<string>('');
  fleetShips = signal<number[]>([]);
  ships = signal<Ship[] | null>(null);
  list = signal<MenuShip[] | null>(null);

  edition = computed(() => editions.find((edition) => edition.id === this.editionName()));
  levels = computed(() => {
    if (this.editionName() === 'pp') return levelsPP;
    if (this.editionName() === '2e') return levels2e;
    if (this.editionName() === 'ar') return levelsAr;
    if (this.editionName() === 'dw') return levelsDW;
    if (this.editionName() === 'dr') return levelsDR;
    return null;
  });
  races = computed(() => {
    if (this.editionName() === 'pp') return racesPP;
    if (this.editionName() === '2e') return races2e;
    if (this.editionName() === 'ar') return racesAr;
    if (this.editionName() === 'dw') return racesDW;
    if (this.editionName() === 'dr') return racesDR;
    return null;
  });
  sources = computed(() =>
    [...new Set(this.ships()?.map((ship) => ship.source))].sort((a: string, b: string) => {
      if (a === this.edition()?.shortName) return -1;
      if (b === this.edition()?.shortName) return 1;
      return a > b ? 1 : -1;
    }),
  );

  sourceName = (source: string) =>
    source === this.edition()?.shortName ? this.edition()?.name : source;

  racesInSource = (source: string) => {
    const raceIds = [
      ...new Set(
        this.list()
          ?.filter((ship) => ship.source === source)
          .map((ship) => ship.raceId),
      ),
    ];
    return raceIds
      .map((raceId) => this.races()?.find((race) => race.raceId === raceId)!)
      .filter(Boolean)
      .sort((a, b) => {
        if (a!.name === 'Ancients') return 1;
        if (b!.name === 'Ancients') return -1;
        return a!.name.toLowerCase() > b!.name.toLowerCase() ? 1 : -1;
      });
  };

  shipsInLevel = (source: string, race: Race, level: Level) =>
    this.list()
      ?.filter(
        (ship) =>
          ship.source === source && ship.raceId === race.raceId && ship.levelId === level.levelId,
      )
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

  getShip = (shipId: number) => this.ships()?.find((ship) => ship.id === shipId);

  getShipAndLevel = (name: string, level: number) =>
    `${this.levels()?.find((l) => l.levelId === level)!.name}: ${name}`;

  getFighters = (source: string, raceId: number) =>
    this.ships()
      ?.filter(
        (ship) =>
          ship.raceId === raceId &&
          (source === ship.source || ship.source === this.edition()?.shortName) &&
          ship.type === SHEET_TYPE.fighter,
      )
      .map((ship) => ship.id)
      .join(',') || '';

  addShipToFleet = (shipId: number) => {
    if (!this.edition()) return;
    let shipIDs =
      localStorage
        .getItem(this.edition()!.fleetKey)
        ?.split(',')
				.filter(Boolean)
        .map((id) => +id) || [];
    shipIDs.push(shipId);
    localStorage.setItem(this.edition()!.fleetKey, shipIDs.filter(Boolean).join(','));
    this.fleetShips.set(shipIDs);
  };

  removeShipFromFleet = (shipId: number) => {
    if (!this.edition()) return;
    const shipIDs =
      localStorage
        .getItem(this.edition()!.fleetKey)
        ?.split(',')
        .map((id) => +id) || [];
    const index = shipIDs.findIndex((id) => id === shipId);
    if (index > -1) shipIDs.splice(index, 1);
    localStorage.setItem(this.edition()!.fleetKey, shipIDs.join(','));
    this.fleetShips.set(shipIDs);
  };

  removeFromSheet = (shipId: number) => {
    const currentShipIDs = new Set(this.activatedRoute.snapshot.queryParams['ShipID']?.split(','));
    if (!currentShipIDs.has(shipId.toString())) return;
    currentShipIDs.delete(shipId.toString());

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ShipID: currentShipIDs.size ? [...currentShipIDs].join(',') : null },
      queryParamsHandling: 'merge',
    });
  };

  constructor() {
    const editionSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      const newEdition = params['edition'] || '';
      if (this.editionName() !== newEdition) {
        this.editionName.set(newEdition.toLowerCase());
      }
    });

    effect(() => {
      if (typeof window !== 'undefined' && this.edition()) {
        this.fleetShips.set(
          window.localStorage
            .getItem(this.edition()!.fleetKey)
            ?.split(',')
            .filter(Boolean)
            .map((id) => +id) || [],
        );
      }
    });

    effect(() => {
      this.list.set(null);
      this.ships.set(null);
      switch (this.editionName()) {
        case 'pp':
          import('./data/pp/ship-list')
            .then((list) => this.list.set(list.ships))
            .catch(() => this.list.set([]));
          import('./data/pp/ship-data')
            .then((data) => this.ships.set(data.ships))
            .catch(() => this.ships.set([]));
          break;
        case '2e':
          import('./data/2e/ship-list')
            .then((list) => this.list.set(list.ships))
            .catch(() => this.list.set([]));
          import('./data/2e/ship-data')
            .then((data) => this.ships.set(data.ships))
            .catch(() => this.ships.set([]));
          break;
        case 'ar':
          import('./data/armageddon/ship-list')
            .then((list) => this.list.set(list.ships))
            .catch(() => this.list.set([]));
          import('./data/armageddon/ship-data')
            .then((data) => this.ships.set(data.ships))
            .catch(() => this.ships.set([]));
          break;
        case 'dw':
          import('./data/dilgar-war/ship-list')
            .then((list) => this.list.set(list.ships))
            .catch(() => this.list.set([]));
          import('./data/dilgar-war/ship-data')
            .then((data) => this.ships.set(data.ships))
            .catch(() => this.ships.set([]));
          break;
        case 'dr':
          import('./data/darkness-rising/ship-list')
            .then((list) => this.list.set(list.ships))
            .catch(() => this.list.set([]));
          import('./data/darkness-rising/ship-data')
            .then((data) => this.ships.set(data.ships))
            .catch(() => this.ships.set([]));
          break;
        default:
          this.list.set([]);
          this.ships.set([]);
      }
    });

    this.destroyRef.onDestroy(() => editionSubscription.unsubscribe());
  }
}
