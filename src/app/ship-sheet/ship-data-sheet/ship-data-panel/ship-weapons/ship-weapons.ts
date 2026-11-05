import { Component, input } from '@angular/core';
import { Race, Ship, Weapon, Weapons } from '../../../../data/types';
import { ShipWeapon } from './ship-weapon';
import { SHEET_TYPE } from '../../../../constants';

@Component({
  imports: [ShipWeapon],
  selector: 'app-ship-weapons',
  styleUrl: './ship-weapons.scss',
  templateUrl: './ship-weapons.html',
})
export class ShipWeapons {
  arc = input.required<keyof Weapons>();
  weapons = input.required<Weapon[]>();
  ship = input.required<Ship>();
  race = input.required<Race>();

  canUseMissileVariants = (weapon: Weapon) =>
    (weapon.name === 'Missile Rack' ||
      weapon.name === 'Missile Racks' ||
      weapon.name === 'Advanced Missile Rack') &&
    (this.race().raceId === 5 || this.race().raceId === 6 || this.race().raceId === 7) &&
    !this.ship().notes.includes('may not use missile variants') &&
    this.ship().type !== SHEET_TYPE.fighter;

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
