import { Component, computed, input, signal } from '@angular/core';

import { SHEET_TYPE } from '../../constants';
import { Level, Race, Ship } from '../../data/pp/types';
import { races } from '../../data/pp/races';
import { levels } from '../../data/pp/levels';

import { ShipName } from './ship-name/ship-name';
import { ShipSpeed } from './ship-speed/ship-speed';
import { ShipDataPanel } from './ship-data-panel/ship-data-panel';
import { ShipDamageTracks } from './ship-damage-tracks/ship-damage-tracks';

@Component({
  imports: [ShipName, ShipSpeed, ShipDataPanel, ShipDamageTracks],
  selector: 'app-ship-data-sheet',
  styleUrl: './ship-data-sheet.scss',
  templateUrl: './ship-data-sheet.html',
})
export class ShipDataSheet {
  ship = input.required<Ship>();
  race = computed<Race | undefined>(() => races.find((race) => race.raceId === this.ship().raceId));
  level = computed<Level | undefined>(() =>
    levels.find((level) => level.levelId === this.ship().levelId),
  );

  isAncient = computed(() => this.race()?.name === 'Ancients');
  isSpaceStation = computed(() => this.ship().type === SHEET_TYPE.station);
  numberOfShips = computed(() => (this.isAncient() || this.isSpaceStation() ? 1 : 4));

  removeFromFleet = signal(true);
}
