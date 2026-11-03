import { Component, inject, input } from '@angular/core';

import { ShipService } from '../../ship.service';
import { Race } from '../../data/types';
import { ShipLevel } from '../ship-level/ship-level';

@Component({
  imports: [ShipLevel],
  selector: 'app-ship-race',
  styleUrl: './ship-race.scss',
  templateUrl: './ship-race.html',
})
export class ShipRace {
  shipService = inject(ShipService);

  source = input.required<string>();
  race = input.required<Race>();
  levels = this.shipService.levels;

  ancientLevel = this.levels()?.at(-1)!;
}
