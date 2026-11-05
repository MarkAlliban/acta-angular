import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ShipList } from './ship-list/ship-list';
import { ShipSheet } from './ship-sheet/ship-sheet';
import { ShipFleet } from './ship-sheet/ship-fleet';
import { Crits } from './crits/crits';
import { Layout } from './layout/layout';
import { ShipDataCheck } from './data/ship-data-check/ship-data-check';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
        title: "Burger's Ship Viewer for ACTA",
      },
      {
        path: 'list',
        component: ShipList,
        title: "Burger's Ship Viewer for ACTA",
      },
      {
        path: 'ship',
        component: ShipSheet,
        title: "Burger's Ship Viewer for ACTA",
      },
      {
        path: 'fleet',
        component: ShipFleet,
        title: "Burger's Ship Viewer for ACTA",
      },
      {
        path: 'crits',
        component: Crits,
        title: "Burger's Ship Viewer for ACTA",
      },
			{
				path: 'ship-data-check',
				component: ShipDataCheck,
        title: "Burger's Ship Viewer for ACTA",
			}
    ],
  },
];
