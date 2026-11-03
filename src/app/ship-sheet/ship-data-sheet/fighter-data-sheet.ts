import { Component, computed, inject, input } from '@angular/core';
import { Level, Race, Ship } from '../../data/types';
import { races } from '../../data/pp/races';
import { levels } from '../../data/pp/levels';

import { ShipService } from '../../ship.service';
import { ShipDataPanel } from './ship-data-panel/ship-data-panel';

@Component({
  imports: [ShipDataPanel],
  selector: 'app-fighter-data-sheet',
  styleUrl: './fighter-data-sheet.scss',
  templateUrl: './fighter-data-sheet.html',
})
export class FighterDataSheet {
  shipService = inject(ShipService);
  ship = input.required<Ship>();
	showDelete = input.required<boolean>();
  race = computed<Race | undefined>(() => races.find((race) => race.raceId === this.ship().raceId));
  level = computed<Level | undefined>(() =>
    levels.find((level) => level.levelId === this.ship().levelId),
  );

  removeFromFleet = () => {
    this.shipService.removeShipFromFleet(this.ship().id);
  };
}
