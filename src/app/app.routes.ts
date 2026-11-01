import { Routes } from '@angular/router';
import { ShipList } from './ship-list/ship-list';
import { ShipSheet } from './ship-sheet/ship-sheet';

export const routes: Routes = [
  {
    path: 'list',
    component: ShipList,
  },
  {
    path: 'ship',
    component: ShipSheet,
  },
];
