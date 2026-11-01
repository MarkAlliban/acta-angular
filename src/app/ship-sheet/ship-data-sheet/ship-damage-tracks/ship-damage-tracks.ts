import { Component, computed, input } from '@angular/core';
import { Race, Ship } from '../../../data/pp/types';
import { DamageBoxes } from './damage-boxes/damage-boxes';

@Component({
  imports: [DamageBoxes],
  selector: 'app-ship-damage-tracks',
  styleUrl: './ship-damage-tracks.scss',
  templateUrl: './ship-damage-tracks.html',
})
export class ShipDamageTracks {
  ship = input.required<Ship>();
  race = input.required<Race>();
  numberOfShips = input.required<number>();
  isSpaceStation = input.required<boolean>();
  isAncient = input.required<boolean>();

  shields = computed(() =>
    this.ship()
      .traits?.find((trait: string) => trait.split(' ')[0].toLowerCase() === 'shields')
      ?.split(' ')[1]
      .replace('/', ' / '),
  );
  selfRepair = computed(
    () =>
      this.ship()
        .traits?.find((trait: string) => trait.toLowerCase().startsWith('self-repair'))
        ?.split(' ')[1],
  );
  hasCrew = computed(() => this.ship().crew);
}
