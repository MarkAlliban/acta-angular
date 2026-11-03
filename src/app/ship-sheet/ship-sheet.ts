import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShipService } from '../ship.service';
import { Ship } from '../data/types';
import { SHEET_TYPE } from '../constants';
import { Kosh } from '../kosh/kosh';
import { ShipDataSheet } from './ship-data-sheet/ship-data-sheet';
import { FighterDataSheet } from './ship-data-sheet/fighter-data-sheet';

@Component({
  imports: [ShipDataSheet, FighterDataSheet, Kosh],
  selector: 'app-ship-sheet',
  styleUrl: './ship-sheet.scss',
  templateUrl: './ship-sheet.html',
})
export class ShipSheet {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  shipService = inject(ShipService);

  edition = this.shipService.edition;

  shipIdArray = signal<number[]>([]);
  shipArray = computed(() =>
    this.shipIdArray()
      .map((shipId) => {
        return this.shipService.getShip(shipId);
      })
      .filter(Boolean)
      .sort((a, b) => (a!.type! < b!.type! ? -1 : 1)),
  );

  isFighter = (ship: Ship) => ship.type === SHEET_TYPE.fighter;

  constructor() {
    const paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      const shipIDs = params['ShipID'];
      this.shipIdArray.set(
        shipIDs?.split(',').map((shipId: string) => Number.parseInt(shipId)) || [],
      );
    });

    this.destroyRef.onDestroy(() => paramsSubscription.unsubscribe());
  }
}
