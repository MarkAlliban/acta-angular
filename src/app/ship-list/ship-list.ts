import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { editions } from '../data/editions';
import { ships } from '../data/pp/ships-list';
import { ShipSource } from './ship-source/ship-source';
import { Kosh } from '../kosh/kosh';

@Component({
  selector: 'app-ship-list',
  styleUrl: './ship-list.scss',
  templateUrl: './ship-list.html',
  imports: [ShipSource, Kosh],
})
export class ShipList {
  private readonly activatedRoute = inject(ActivatedRoute);
  ships = ships;
  editionName = signal('');
	showSupplemental = signal(false);
  destroyRef = inject(DestroyRef);

  edition = computed(() =>
    editions.find(
      (edition) => edition.abbreviation.toLowerCase() === this.editionName().toLowerCase(),
    ),
  );
  sources = computed(() =>
    [...new Set(ships.map((ship) => ship.source))].sort((a: string, b: string) => {
      if (a === this.edition()?.edition) return -1;
      if (b === this.edition()?.edition) return 1;
      return a > b ? 1 : -1;
    }),
  );

  constructor() {
    const editionSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.editionName.set(params['edition'] || '');
    });

    this.destroyRef.onDestroy(() => editionSubscription.unsubscribe());
  }
}
