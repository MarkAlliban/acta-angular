import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Level, MenuShip } from '../../data/pp/types';
import { SHEET_TYPE } from '../../constants';
import { editions } from '../../data/editions';

@Component({
  imports: [],
  selector: 'app-ship-level',
  styleUrl: './ship-level.scss',
  templateUrl: './ship-level.html',
})
export class ShipLevel {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  editionName = signal<string>('');
  level = input.required<Level>();
  ships = input.required<MenuShip[]>();

  edition = computed(() =>
    editions.find(
      (edition) => edition.abbreviation.toLowerCase() === this.editionName().toLowerCase(),
    ),
  );

  shipsSorted = computed(() => {
    return this.ships().sort((a, b) => (a.name > b.name ? 1 : -1));
  });

  isFighter = (ship: MenuShip) => ship.type === SHEET_TYPE.fighter;

  constructor() {
    const editionSubscrption = this.activatedRoute.queryParams.subscribe((params) => {
      this.editionName.set(params['edition'] || '');
    });

    this.destroyRef.onDestroy(() => editionSubscrption.unsubscribe());
  }
}
