import { Component, computed, input } from '@angular/core';
import { MenuShip } from '../../data/pp/types';
import { races } from '../../data/pp/races';
import { ShipRace } from '../ship-race/ship-race';
import { levels } from '../../data/pp/levels';

@Component({
  imports: [ShipRace],
  selector: 'app-ship-source',
  styleUrl: './ship-source.scss',
  templateUrl: './ship-source.html',
})
export class ShipSource {
  source = input.required<string>();
  isFirstSource = input.required<boolean>();
  levels = levels;
  ships = input.required<MenuShip[]>();
  races = computed(() =>
    [
      ...new Set(
        this.ships().map((ship) => races.find((race) => race.raceId === ship.raceId) || races[0]),
      ),
    ].sort((a, b) => {
      if (a.name === 'Ancients') return 1;
      if (b.name === 'Ancients') return -1;
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    }),
  );
}
