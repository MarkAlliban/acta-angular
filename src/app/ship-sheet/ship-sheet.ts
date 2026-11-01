import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { editions } from '../data/editions';
import { ships } from '../data/pp/ship-data';
import { ShipDataSheet } from './ship-data-sheet/ship-data-sheet';
import { FighterDataSheet } from './ship-data-sheet/fighter-data-sheet';
import { Kosh } from '../kosh/kosh';
import { SHEET_TYPE } from '../constants';

@Component({
  imports: [ShipDataSheet, FighterDataSheet, Kosh],
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
	isFighter = computed(() => this.ship()?.type === SHEET_TYPE.fighter);

  constructor() {
    const paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.editionName.set(params['edition'] || '');
      this.shipId.set(+params['ShipID'] || null);
    });

    this.destroyRef.onDestroy(() => paramsSubscription.unsubscribe());
  }
}
