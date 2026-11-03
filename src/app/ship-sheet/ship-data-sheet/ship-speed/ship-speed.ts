import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ship-speed',
  styleUrl: './ship-speed.scss',
  templateUrl: './ship-speed.html',
})
export class ShipSpeed {
  numberOfShips = input.required<number>();
  speed = input.required<string>();
  troops = input.required<string>();
	isSpaceStation = input.required<boolean>();
	isAncient = input.required<boolean>();
	isOldRace = input.required<boolean>();
}
