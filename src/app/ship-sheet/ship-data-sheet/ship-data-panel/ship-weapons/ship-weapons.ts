import { Component, input } from '@angular/core';
import { Weapon, Weapons } from '../../../../data/pp/types';

@Component({
  imports: [],
  selector: 'app-ship-weapons',
  styleUrl: './ship-weapons.scss',
  templateUrl: './ship-weapons.html',
})
export class ShipWeapons {
  arc = input.required<keyof Weapons>();
  weapons = input.required<Weapon[]>();

  arcName = {
    b: 'Boresight',
    f: 'Forward',
    p: 'Port',
    s: 'Starboard',
    a: 'Aft',
    ba: 'Boresight Aft',
    t: 'Turret',
  };
}
