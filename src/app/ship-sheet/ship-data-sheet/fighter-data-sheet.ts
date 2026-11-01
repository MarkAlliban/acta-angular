import { Component, computed, input } from '@angular/core';
import { Level, Race, Ship } from '../../data/pp/types';
import { races } from '../../data/pp/races';
import { levels } from '../../data/pp/levels';
import { ShipDataPanel } from './ship-data-panel/ship-data-panel';

@Component({
  imports: [ShipDataPanel],
  selector: 'app-fighter-data-sheet',
  styleUrl: './fighter-data-sheet.scss',
  templateUrl: './fighter-data-sheet.html',
})
export class FighterDataSheet {
  ship = input.required<Ship>();
  race = computed<Race | undefined>(() => races.find((race) => race.raceId === this.ship().raceId));
  level = computed<Level | undefined>(() =>
    levels.find((level) => level.levelId === this.ship().levelId),
  );
}
