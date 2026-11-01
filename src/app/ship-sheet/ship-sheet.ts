import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { editions } from '../data/editions';
import { ships } from '../data/pp/ship-data';
import { ShipDataSheet } from './ship-data-sheet/ship-data-sheet';
import { Kosh } from '../kosh/kosh';
import { races } from '../data/pp/races';

@Component({
  imports: [ShipDataSheet, Kosh],
  selector: 'app-ship-sheet',
  styleUrl: './ship-sheet.scss',
  templateUrl: './ship-sheet.html',
})
export class ShipSheet {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  editionName = signal<string>('');
  shipId = signal<number | null>(null);

  edition = computed(() =>
    editions.find(
      (edition) => edition.abbreviation.toLowerCase() === this.editionName().toLowerCase(),
    ),
  );
  ship = computed(() => ships.find((ship) => ship.id === this.shipId()));

  constructor() {
    const paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.editionName.set(params['edition'] || '');
      this.shipId.set(+params['ShipID'] || null);
    });

    this.destroyRef.onDestroy(() => paramsSubscription.unsubscribe());

		const fighterStrings:string[] = [];
    ships.forEach((ship) => {
			const race = races.find(race => race.raceId === ship.raceId)!;
			const newShip = {...ship};
    });
  }
}
