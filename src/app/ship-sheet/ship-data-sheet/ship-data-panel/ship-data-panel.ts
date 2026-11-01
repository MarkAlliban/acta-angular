import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fighters, Ship, Weapons } from '../../../data/pp/types';
import { SHEET_TYPE } from '../../../constants';
import { getISDString } from '../../../utils';
import { ShipWeapons } from './ship-weapons/ship-weapons';
import { CraftSwappable } from './craft-swappable/craft-swappable';

@Component({
  imports: [ShipWeapons, CraftSwappable, FormsModule],
  selector: 'app-ship-data-panel',
  styleUrl: './ship-data-panel.scss',
  templateUrl: './ship-data-panel.html',
})
export class ShipDataPanel {
  ship = input.required<Ship>();
  numberOfShips = input.required<number>();

  isFighter = computed(() => this.ship().type === SHEET_TYPE.fighter);
  isdString = computed(() => getISDString(this.ship().isdFrom, this.ship().isdTo));
  craftSwappable = computed(() =>
    this.ship().allFighters?.reduce((a: number, c: Fighters) => {
      const craft = this.ship().craft?.find((craft) => craft.name === c.name);
      return a + (c.swapOut ? c.price || craft?.number || 0 : 0);
    }, 0),
  );
  weaponArcs = computed(() => Object.keys(this.ship().weapons) as (keyof Weapons)[]);
  numWeapons = computed(() => Object.keys(this.ship().weapons).length);
}
