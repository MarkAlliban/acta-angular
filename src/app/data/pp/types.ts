export type Level = {
  levelId: number;
  name: string;
};

export type RaceFighters = {
  id: number;
  swapOut?: boolean;
  swapIn?: boolean;
  price?: number;
};

export type Race = {
  raceId: number;
  name: string;
  color1?: string;
  color2?: string;
  fighters: RaceFighters[];
};

type WeaponTrait = string;

export type Weapon = {
  name: string;
  range: number;
  ad?: number;
  traits?: WeaponTrait[];
};

export type Weapons = {
  b?: Weapon[];
  f?: Weapon[];
  p?: Weapon[];
  s?: Weapon[];
  a?: Weapon[];
  ba?: Weapon[];
  t?: Weapon[];
};

export type Fighters = {
  id: number;
  name: string;
  source: string;
  swapOut?: boolean;
  swapIn?: boolean;
  price?: number;
};

export type MenuShip = {
  id: number;
  name: string;
  raceId: number;
  levelId: number;
  type: number;
  source: string;
  numberPerWing?: number;
};

export type Ship = {
  id: number;
  name: string;
  raceId: number;
  levelId: number;
  speed: string;
  troops: string;
  isdFrom: string;
  isdTo: string;
  hull: string;
  turns: string;
  craft?: { id?: number; name?: string; number: number }[];
  numberInWing?: number;
  traits: string[];
  damage: number;
  crippled: number;
  crew: number;
  skeletoned: number;
  type: number;
  notes: string;
  shortName: string;
  source: string;
  weapons: Weapons;
  allFighters?: Fighters[];
};
