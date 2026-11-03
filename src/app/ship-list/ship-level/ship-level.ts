import { Component, inject, input, OnInit, signal } from '@angular/core';

import { ShipService } from '../../ship.service';
import { Level, MenuShip, Race } from '../../data/types';
import { SHEET_TYPE } from '../../constants';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-ship-level',
  styleUrl: './ship-level.scss',
  templateUrl: './ship-level.html',
})
export class ShipLevel implements OnInit {
  shipService = inject(ShipService);

  edition = this.shipService.edition;
  source = input.required<string>();
  race = input.required<Race>();
  level = input.required<Level>();
  ships = signal<MenuShip[]>([]);
  allFighters = signal('');

  ngOnInit() {
    this.ships.set(this.shipService.shipsInLevel(this.source(), this.race(), this.level()) || []);
    this.allFighters.set(this.shipService.getFighters(this.source(), this.race().raceId));
  }

  isFighter = (ship: MenuShip) => ship.type === SHEET_TYPE.fighter;
}
