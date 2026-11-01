import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Race, Ship, Weapons } from '../../../data/pp/types';
import { SHEET_TYPE } from '../../../constants';
import { getISDString } from '../../../utils';
import { ShipWeapons } from './ship-weapons/ship-weapons';
import { CraftSwappable } from './craft-swappable/craft-swappable';
import { ships } from '../../../data/pp/ship-data';

@Component({
  imports: [ShipWeapons, CraftSwappable, FormsModule],
  selector: 'app-ship-data-panel',
  styleUrl: './ship-data-panel.scss',
  templateUrl: './ship-data-panel.html',
})
export class ShipDataPanel {
  ship = input.required<Ship>();
  race = input.required<Race>();
  numberOfShips = input.required<number>();
	fighter = input<boolean>();

  isFighter = computed(() => this.ship().type === SHEET_TYPE.fighter);
  isdString = computed(() => getISDString(this.ship().isdFrom, this.ship().isdTo));
  craft = computed(() =>
    this.ship().craft?.map((craft) => {
      if (craft.name) return craft;
      const f = ships.find((ship) => ship.id === craft.id);
      return { name: f?.name, number: craft.number };
    }),
  );
  canSwapCraft = computed(
    () =>
      this.ship().traits.some((trait) => trait.toLowerCase().startsWith('huge hangars')) ||
      this.ship().craft?.some((c) => this.race().fighters.some((f) => f.id === c.id && f.swapOut)),
  );
  weaponArcs = computed(() => Object.keys(this.ship().weapons) as (keyof Weapons)[]);
}
