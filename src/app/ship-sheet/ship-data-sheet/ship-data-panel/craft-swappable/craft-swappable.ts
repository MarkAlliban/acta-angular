import { Component, computed, ElementRef, input, OnInit, signal } from '@angular/core';
import { Race, RaceFighters, Ship } from '../../../../data/types';
import { ships } from '../../../../data/pp/ship-data';

type SwappableFighter = RaceFighters & {
  name: string;
  originalNumber: number;
  assignedNumber: number;
};

@Component({
  imports: [],
  selector: 'app-craft-swappable',
  styleUrl: './craft-swappable.scss',
  templateUrl: './craft-swappable.html',
})
export class CraftSwappable implements OnInit {
  ship = input.required<Ship>();
  race = input.required<Race>();
  swappableCraftOpen = signal(false);
  assignedCraft = signal<SwappableFighter[]>([]);

  hugeHangars = computed(() =>
    parseInt(
      this.ship()
        .traits?.find((trait) => trait.toLowerCase().startsWith('huge hangars'))
        ?.split(' ')[2] || '0',
    ),
  );

  craftTotal = computed(
    () => this.hugeHangars() || this.ship().craft?.reduce((a, c) => a + (c.number || 0), 0) || 0,
  );
  craftAssigned = computed(() =>
    this.assignedCraft().reduce((a, c) => {
      return (
        a +
        (this.hugeHangars() && c.name === "Atas'da Breaching Pod"
          ? 0
          : (c.assignedNumber || 0) * (c.price || 1))
      );
    }, 0),
  );

  openSwappableCraft = (open: boolean) => this.swappableCraftOpen.set(open);

  changeCraft = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target) return;
    const {
      value,
      dataset: { id = '' },
    } = target;

    const craft = this.assignedCraft().find((craft) => craft.id === Number.parseInt(id))!;
    const oldNumber = craft.assignedNumber;
    const valueInt = Number.parseInt(value);
    craft.assignedNumber = valueInt;

    let canChange = true;
    // No negative fighter numbers
    if (valueInt < 0) {
      canChange = false;
    }
    // Total fighters can't exceed total allowed number
    if (
      this.assignedCraft().reduce(
        (a: number, c) =>
          a + (c.name === "Atas'da Breaching Pod" ? 0 : c.assignedNumber * (c.price || 1)),
        0,
      ) > this.craftTotal()
    ) {
      canChange = false;
    }

    // Can't reduce non-swap-outable fighters below initial value
    if (!craft.swapOut && craft.assignedNumber < craft.originalNumber) {
      canChange = false;
    }

    // Can't increase non-swap-innable fighters above initial value
    if (!craft.swapIn && craft.assignedNumber > craft.originalNumber) {
      canChange = false;
    }

    if (!canChange) {
      craft.assignedNumber = oldNumber;
      target.value = oldNumber.toString();
    } else {
      this.assignedCraft.set([...this.assignedCraft()]);
    }
  };

  setSwappableCraft = () => {
    const newCraft: SwappableFighter[] =
      this.race()
        .fighters.filter((f) => !this.hugeHangars() || (f.price || 1) <= this.hugeHangars())
        .map((f) => {
          const fighter = ships.find((ship) => ship.id === f.id);
          return { ...f, name: fighter?.name || '', originalNumber: 0, assignedNumber: 0 };
        }) || [];
    this.ship().craft?.forEach((craft) => {
      const craftToUpdate = newCraft.find((c) => c.id === craft.id);
      if (craftToUpdate) {
        craftToUpdate.originalNumber = craft.number || 0;
        craftToUpdate.assignedNumber = craft.number || 0;
      } else {
        newCraft.push({
          id: 0,
          name: '',
          ...craft,
          assignedNumber: craft.number || 0,
          originalNumber: craft.number || 0,
        });
      }
    });
    this.assignedCraft.set(newCraft);
  };

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.gridColumn = 'span 2';
  }

  ngOnInit() {
    this.setSwappableCraft();
    if (this.hugeHangars()) {
      this.swappableCraftOpen.set(true);
    }
  }
}
