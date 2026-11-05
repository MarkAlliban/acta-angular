import { Component, inject } from '@angular/core';
import { ShipService } from '../ship.service';
import { CritsPp } from './crits-pp/crits-pp';
import { CritsSe } from './crits-se/crits-se';
import { CritsAr } from './crits-ar/crits-ar';
import { Kosh } from '../shared/kosh/kosh';

@Component({
  imports: [CritsPp, CritsSe, CritsAr, Kosh],
  selector: 'app-crits',
  styleUrl: './crits.scss',
  templateUrl: './crits.html',
})
export class Crits {
  shipService = inject(ShipService);
  edition = this.shipService.edition();
}
