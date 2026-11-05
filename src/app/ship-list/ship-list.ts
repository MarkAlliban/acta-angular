import { Component, computed, effect, inject, signal } from '@angular/core';

import { ShipService } from '../ship.service';
import { ShipSource } from './ship-source/ship-source';
import { Kosh } from '../shared/kosh/kosh';
import { Loading } from '../shared/loading/loading';
// import { ships as shipData } from '../data/darkness-rising/ship-data';

@Component({
  selector: 'app-ship-list',
  styleUrl: './ship-list.scss',
  templateUrl: './ship-list.html',
  imports: [ShipSource, Kosh, Loading],
})
export class ShipList {
  shipService = inject(ShipService);

  edition = this.shipService.edition;
  ships = this.shipService.list;
  listSources = computed(() =>
    [...new Set(this.ships()?.map((ship) => ship.source))].sort((a: string, b: string) => {
      if (a === this.edition()?.shortName) return -1;
      if (b === this.edition()?.shortName) return 1;
      return a > b ? 1 : -1;
    }),
  );
  showSupplemental = signal(false);

  // constructor() {
  //   effect(() => {
  //     if (!this.ships()?.length) return;
  //     /* Check fighter data is consistent across all ships */
  //     const allFighters: string[] = [];
  //     let errors = false;
  //     shipData.forEach((ship) => {
  //       if (!allFighters[ship.raceId]) {
  //         allFighters[ship.raceId] = JSON.stringify(ship.AllFighters);
  //         return;
  //       }
  //       if (allFighters[ship.raceId] === JSON.stringify(ship.AllFighters)) return;
  //       errors = true;
  //       console.error(
  //         'AllFighters is different!',
  //         ship.raceId,
  //         allFighters[ship.raceId],
  //         ship.AllFighters,
  //       );
  //     });
  //     if (errors) return;
  //     allFighters.forEach((a, index) => console.log(index, a));
  //     /* Convert data format */
  //     shipData.forEach((ship) => {
  //     	const newShip = {...ship};
  //       delete newShip.LevelName;
  //       delete newShip.RaceName;
  //       newShip.damage = Number.parseInt(ship.DamageValue || '0');
  //       delete newShip.DamageValue;
  //       newShip.crippled = Number.parseInt(ship.Crippled || '0');
  //       delete newShip.Crippled;
  //       newShip.crew = Number.parseInt(ship.CrewValue || '0');
  //       delete newShip.CrewValue;
  //       newShip.skeletoned = Number.parseInt(ship.Skeletoned || '0');
  //       delete newShip.Skeletoned;
  //       delete newShip.CrippledColour1;
  //       delete newShip.CrippledColour2;
  //       delete newShip.AllFighters;
  //       if (ship.craft?.[0] && !ship.craft[0].number) {
  //         delete newShip.craft;
  //       }
  //       console.log(JSON.stringify(newShip), ',');
  //     });
  //   });
  // }
}
