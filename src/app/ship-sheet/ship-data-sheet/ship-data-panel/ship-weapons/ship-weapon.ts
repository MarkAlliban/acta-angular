import { Component, input, OnInit } from '@angular/core';
import { Weapon } from '../../../../data/types';

const MISSILE_TYPES: Weapon[] = [
  { name: '', range: 30, traits: ['P', 'SAP'], ad: 0 },
  { name: '(F)', range: 20, traits: ['AP', 'DD', 'P'], ad: 0 },
  { name: '(H)', range: 10, traits: ['TD', 'SAP'], ad: 0 },
  { name: '(AF)', range: 15, traits: ['AF'], ad: 0 },
  { name: '(LR)', range: 40, traits: ['AP', 'P'], ad: 0 },
  { name: '(MW)', range: 30, traits: ['AP', 'P'], ad: 0 },
  { name: '(HA)', range: 15, traits: ['SAP'], ad: 0 },
];

@Component({
  imports: [],
  selector: 'app-ship-weapon',
  styleUrl: './ship-weapon.scss',
  templateUrl: './ship-weapon.html',
})
export class ShipWeapon implements OnInit {
  weapon = input.required<Weapon>();
  canUseMissileVariants = input.required<boolean>();
  weaponToShow: Weapon | null = null;
  missileVariant = 0;

  ngOnInit() {
    this.weaponToShow = { ...this.weapon() };
  }

  changeMissileVariant = () => {
    this.missileVariant++;
    if (this.missileVariant >= MISSILE_TYPES.length) this.missileVariant = 0;
    const name = this.weaponToShow!.name.split('(')[0].trim();
    this.weaponToShow!.name = `${name} ${MISSILE_TYPES[this.missileVariant].name}`;
    this.weaponToShow!.range = MISSILE_TYPES[this.missileVariant].range;
    this.weaponToShow!.traits = MISSILE_TYPES[this.missileVariant].traits;
  };
}
