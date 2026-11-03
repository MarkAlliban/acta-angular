export type Edition = {
  id: string;
  name: string;
  shortName: string;
  fleetKey: string;
};

export const editions: Edition[] = [
  {
    id: 'pp',
    name: 'Powers & Principalities',
    shortName: 'P&P',
    fleetKey: 'Fleet-PP',
  },
  {
    id: '2e',
    name: 'Second Edition',
    shortName: '2e',
    fleetKey: 'Fleet-2e',
  },
  {
    id: 'ar',
    name: 'Armageddon',
    shortName: 'Ar',
    fleetKey: 'Fleet-AR',
  },
  {
    id: 'dr',
    name: 'Darkness Rising',
    shortName: 'DR',
    fleetKey: 'Fleet-DR',
  },
  {
    id: 'dw',
    name: 'Dilgar War',
    shortName: 'DW',
    fleetKey: 'Fleet-DW',
  },
];
