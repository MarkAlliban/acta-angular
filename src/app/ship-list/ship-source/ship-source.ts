import { Component, computed, inject, input, OnInit, signal } from '@angular/core';

import { ShipService } from '../../ship.service';
import { Race } from '../../data/types';
import { ShipRace } from '../ship-race/ship-race';

@Component({
  imports: [ShipRace],
  selector: 'app-ship-source',
  styleUrl: './ship-source.scss',
  templateUrl: './ship-source.html',
})
export class ShipSource implements OnInit {
  shipService = inject(ShipService);

  source = input.required<string>();
  sourceName = computed(() => this.shipService.sourceName(this.source()));
  isFirstSource = input.required<boolean>();
  levels = this.shipService.levels;
  races = signal<Race[]>([]);

  ngOnInit() {
    this.races.set(this.shipService.racesInSource(this.source()));
  }
}
