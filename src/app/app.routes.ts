import { Routes } from '@angular/router';
import { ShipList } from './ship-list/ship-list';
import { ShipSheet } from './ship-sheet/ship-sheet';
import { ShipFleet } from './ship-sheet/ship-fleet';

export const routes: Routes = [
  {
    path: 'list',
    component: ShipList,
  },
  {
    path: 'ship',
    component: ShipSheet,
  },
  {
    path: 'fleet',
    component: ShipFleet,
  },
];
