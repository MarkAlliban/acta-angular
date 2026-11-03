import { Component, input, signal } from '@angular/core';

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
  rows = signal<number>(0);
	lastRow = signal<number>(0);

  ngOnInit() {
    this.rows.set(Math.ceil(this.boxes() / 10));
		this.lastRow.set(this.boxes() % 10 || 10);
  }
}
