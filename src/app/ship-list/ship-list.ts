import { Component, inject, signal } from '@angular/core';

import { ShipService } from '../ship.service';
import { ShipSource } from './ship-source/ship-source';
import { Kosh } from '../kosh/kosh';
// import { ships as shipData } from '../data/2e/ship-data';

@Component({
  selector: 'app-ship-list',
  styleUrl: './ship-list.scss',
  templateUrl: './ship-list.html',
  imports: [ShipSource, Kosh],
})
export class ShipList {
  shipService = inject(ShipService);

  edition = this.shipService.edition;
  ships = this.shipService.list;
  sources = this.shipService.sources;
  showSupplemental = signal(false);

  // constructor() {
  //   const allFighters: string[] = [];
  //   shipData.forEach((ship) => {
	// 		const newShip = {...ship};
  //     delete newShip.LevelName;
  //     delete newShip.RaceName;
  //     newShip.damage = Number.parseInt(ship.DamageValue || '0');
  //     delete newShip.DamageValue;
  //     newShip.crippled = Number.parseInt(ship.Crippled || '0');
  //     delete newShip.Crippled;
  //     newShip.crew = Number.parseInt(ship.CrewValue || '0');
  //     delete newShip.CrewValue;
  //     newShip.skeletoned = Number.parseInt(ship.Skeletoned || '0');
  //     delete newShip.Skeletoned;
  //     delete newShip.CrippledColour1;
  //     delete newShip.CrippledColour2;
  //     delete newShip.AllFighters;
  //     if (ship.craft?.[0] && !ship.craft[0].number) {
  //       newShip.numberInWing = +ship.craft[0].name!;
  //       delete newShip.craft;
  //     }
  //     console.log(JSON.stringify(newShip), ',');
  //   });
  // }
}
