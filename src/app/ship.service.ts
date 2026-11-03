import { computed, DestroyRef, effect, inject, Service, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { editions } from './data/editions';
import { Level, Race } from './data/types';
import { SHEET_TYPE } from './constants';

import { races as racesPP } from './data/pp/races';
import { levels as levelsPP } from './data/pp/levels';
import { ships as shipsPP } from './data/pp/ship-data';
import { ships as listPP } from './data/pp/ship-list';

import { races as races2e } from './data/2e/races';
import { levels as levels2e } from './data/2e/levels';
import { ships as ships2e } from './data/2e/ship-data';
import { ships as list2e } from './data/2e/ship-list';

import { races as racesArmageddon } from './data/armageddon/races';
import { levels as levelsArmageddon } from './data/armageddon/levels';
import { ships as shipsArmageddon } from './data/armageddon/ship-data';
import { ships as listArmageddon } from './data/armageddon/ship-list';

@Service()
export class ShipService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  editionName = signal<string>('');
  fleetShips = signal<number[]>([]);

  edition = computed(() => editions.find((edition) => edition.id === this.editionName()));
  levels = computed(() => {
    if (this.editionName() === 'pp') return levelsPP;
    if (this.editionName() === '2e') return levels2e;
    if (this.editionName() === 'ar') return levelsArmageddon;
    return null;
  });
  races = computed(() => {
    if (this.editionName() === 'pp') return racesPP;
    if (this.editionName() === '2e') return races2e;
    if (this.editionName() === 'ar') return racesArmageddon;
    return null;
  });
  ships = computed(() => {
    if (this.editionName() === 'pp') return shipsPP;
    if (this.editionName() === '2e') return ships2e;
    if (this.editionName() === 'ar') return shipsArmageddon;
    return null;
  });
  list = computed(() => {
    if (this.editionName() === 'pp') return listPP;
    if (this.editionName() === '2e') return list2e;
    if (this.editionName() === 'ar') return listArmageddon;
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
    const currentShipIDs = new Set(localStorage.getItem(this.edition()!.fleetKey)?.split(',').map(id => +id));
    if (currentShipIDs.has(shipId)) return;
    currentShipIDs.add(shipId);
    localStorage.setItem(this.edition()!.fleetKey, [...currentShipIDs].filter(Boolean).join(','));
    this.fleetShips.set([...currentShipIDs]);
  };

  removeShipFromFleet = (shipId: number) => {
    if (!this.edition()) return;
    const currentShipIDs = new Set(localStorage.getItem(this.edition()!.fleetKey)?.split(',').map(id => +id));
    if (!currentShipIDs.has(shipId)) return;
    currentShipIDs.delete(shipId);
    localStorage.setItem(this.edition()!.fleetKey, [...currentShipIDs].filter(Boolean).join(','));
    this.fleetShips.set([...currentShipIDs]);
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
            .map((id) => +id) || [],
        );
      }
    });

    this.destroyRef.onDestroy(() => editionSubscription.unsubscribe());
  }
}
