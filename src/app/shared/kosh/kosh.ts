import { Component, input, OnInit } from '@angular/core';

const koshisms: string[] = [
  'We take no interest in the affairs of others.',
  'We will meet in Red 3 at the hour of scampering.',
  'Understanding is a three-edged sword.',
  'Ah, you seek meaning. Then listen to the music, not the song.',
  'A stroke of the brush does not guarantee art from the bristles.',
  'The avalanche has already started. It is too late for the pebbles to vote.',
  'You have always been here.',
];

@Component({
  imports: [],
  selector: 'app-kosh',
  styleUrl: './kosh.scss',
  templateUrl: './kosh.html',
})
export class Kosh implements OnInit {
  message = input.required<string>();
  koshism = koshisms[Math.floor(Math.random() * koshisms.length)];

  ngOnInit() {
    console.error('Kosh appears!', this.message());
  }
}
