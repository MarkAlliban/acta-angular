import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-damage-boxes',
  styleUrl: './damage-boxes.scss',
  templateUrl: './damage-boxes.html',
})
export class DamageBoxes {
  boxes = input.required<number>();
  colored = input.required<number>();
  color = input.required<string | undefined>();
}
