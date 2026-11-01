import { Component, input } from '@angular/core';
import { Race, MenuShip } from '../../data/pp/types';
import { levels } from '../../data/pp/levels';
import { ShipLevel } from '../ship-level/ship-level';

@Component({
  imports: [ShipLevel],
  selector: 'app-ship-race',
  styleUrl: './ship-race.scss',
  templateUrl: './ship-race.html',
})
export class ShipRace {
  race = input.required<Race>();
  ships = input.required<MenuShip[]>();
  levels = levels;
	ancientLevel = levels.at(-1)!;
}
