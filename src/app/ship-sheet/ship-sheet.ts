import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ShipService } from '../ship.service';
import { Ship } from '../data/types';
import { MAX_REFRESHES, SHEET_TYPE } from '../constants';
import { Kosh } from '../shared/kosh/kosh';
import { Loading } from '../shared/loading/loading';
import { ShipDataSheet } from './ship-data-sheet/ship-data-sheet';
import { FighterDataSheet } from './ship-data-sheet/fighter-data-sheet';

@Component({
  imports: [ShipDataSheet, FighterDataSheet, Kosh, Loading],
  selector: 'app-ship-sheet',
  styleUrl: './ship-sheet.scss',
  templateUrl: './ship-sheet.html',
})
export class ShipSheet {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private router = inject(Router);
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
  needToRefresh = computed(
    () => this.edition() && this.shipService.ships() !== null && !this.shipService.ships()!.length,
  );

  isFighter = (ship: Ship) => ship.type === SHEET_TYPE.fighter;

  addToFleet = () => {
    if (this.shipIdArray().length !== 1) return;
    this.shipService.addShipToFleet(this.shipIdArray()[0]);
    this.router.navigate(['/fleet'], { queryParams: { edition: this.edition()?.id } });
  };

  constructor() {
    const paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      const shipIDs = params['ShipID'];
      const newShipIDs = shipIDs?.split(',').map((shipId: string) => Number.parseInt(shipId)) || [];
      if (
        newShipIDs.length !== this.shipIdArray().length ||
        newShipIDs.some((id: number, index: number) => this.shipIdArray()[index] !== id)
      ) {
        this.shipIdArray.set(newShipIDs);
      }
    });

    effect(() => {
      const r = (parseInt(this.activatedRoute.snapshot.queryParams['r']) || 0) + 1;
      if (this.needToRefresh()) {
        if (r > MAX_REFRESHES) return;
        this.router.navigate([], { queryParams: { r }, queryParamsHandling: 'merge' });
      } else {
        if (this.edition() && this.shipService.ships() !== null && r !== 1) {
          this.router.navigate([], { queryParams: { r: undefined }, queryParamsHandling: 'merge' });
        }
      }
    });

    this.destroyRef.onDestroy(() => paramsSubscription.unsubscribe());
  }
}
