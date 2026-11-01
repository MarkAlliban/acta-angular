import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ship-name',
  styleUrl: './ship-name.scss',
  templateUrl: './ship-name.html',
})
export class ShipName {
  numberOfShips = input.required<number>();
}
