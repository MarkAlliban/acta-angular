import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ShipService } from '../ship.service';
import { FormsModule } from '@angular/forms';
import { Ship } from '../data/types';
import { SHEET_TYPE } from '../constants';
import { ShipDataSheet } from './ship-data-sheet/ship-data-sheet';
import { FighterDataSheet } from './ship-data-sheet/fighter-data-sheet';
import { Kosh } from '../shared/kosh/kosh';
import { Loading } from '../shared/loading/loading';

@Component({
  imports: [FormsModule, ShipDataSheet, FighterDataSheet, Kosh, Loading],
  selector: 'app-ship-fleet',
  styleUrl: './ship-fleet.scss',
  templateUrl: './ship-fleet.html',
})
export class ShipFleet {
  destroyRef = inject(DestroyRef);
  shipService = inject(ShipService);
  edition = this.shipService.edition;
  shipIdArray = this.shipService.fleetShips;

  shipArray = computed(() =>
    this.shipIdArray()
      .map((shipId) => this.shipService.getShip(shipId))
      .filter(Boolean)
      .sort((a, b) => (a!.type! < b!.type! ? -1 : 1)),
  );

  selectedRace = signal<string>('');
  filteredShips = computed(() =>
    this.shipService
      .ships()
      ?.filter((ship) => ship.raceId === +this.selectedRace())
      .sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      })
      .sort((a, b) => {
        if (a.levelId === b.levelId) return 0;
        return a.levelId > b.levelId ? 1 : -1;
      }),
  );
  selectedShip = signal<string>('');

  isFighter = (ship: Ship) => ship.type === SHEET_TYPE.fighter;

  addSelectedShip = () => {
    if (this.selectedShip()) {
      this.shipService.addShipToFleet(Number.parseInt(this.selectedShip()));
    }
  };
}
