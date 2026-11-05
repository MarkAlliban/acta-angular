import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShipService } from '../../ship.service';
import { editions } from '../editions';

@Component({
  imports: [RouterLink],
  selector: 'app-ship-data-check',
  styleUrl: './ship-data-check.scss',
  templateUrl: './ship-data-check.html',
})
export class ShipDataCheck {
  shipService = inject(ShipService);
  editions = editions;

  // Ships in the list with no data
  list2 = computed(() => {
    if (!this.shipService.ships()?.length || !this.shipService.list()?.length) return;
    return this.shipService
      .list()
      ?.filter((l) => !this.shipService.ships()?.some((s) => s.id === l.id))
      .map((s) => s.id);
  });

  // Ships with data but not in the list
  list3 = computed(() => {
    if (!this.shipService.ships()?.length || !this.shipService.list()?.length) return;
    return this.shipService
      .ships()
      ?.filter((s) => !this.shipService.list()?.some((l) => l.id === s.id))
      .map((s) => s.id);
  });

  // Ships with mis-matched data / list info
  list4 = computed(() => {
    if (!this.shipService.ships()?.length || !this.shipService.list()?.length) return;
    return this.shipService.ships()?.filter((s) => {
      const l = this.shipService.list()?.find((l) => l.id === s.id);
      if (l?.raceId !== s.raceId) return true;
      if (l.levelId !== s.levelId) return true;
      if (l.type !== s.type) return true;
      if (l.source !== s.source) return true;
      return false;
    });
  });

  // Ships with invalid race
  races1 = computed(() => {
    if (!this.shipService.ships()?.length || !this.shipService.list()?.length) return;
    return this.shipService
      .ships()
      ?.filter((s) => !this.shipService.races()?.find((r) => r.raceId === s.raceId));
  });

  // Fighters not in the list
  fighters1 = computed(() => {
    if (!this.shipService.ships()?.length || !this.shipService.list()?.length) return;
    return this.shipService
      .races()
      ?.filter((race) =>
        race.fighters.some((f) => !this.shipService.ships()?.some((s) => f.id === s.id)),
      );
  });

  // Ships with fighters not allocated to their race
  fighters2 = computed(() => {
    if (!this.shipService.ships()?.length || !this.shipService.list()?.length) return;
    return this.shipService
      .ships()
      ?.map((s) => {
        const race = this.shipService.races()?.find((r) => s.raceId === r.raceId);
        const c = s.craft?.find((c) => c.id && !race?.fighters.some((f) => f.id === c.id));
        return { id: s.id, name: s.shortName, fighter: c?.id || c?.name };
      })
      .filter((s) => s.fighter);
  });

  // Races with no ships
  races2 = computed(() => {
    if (!this.shipService.ships()?.length || !this.shipService.list()?.length) return;
    return this.shipService
      .races()
      ?.filter((r) => !this.shipService.ships()?.some((s) => s.raceId === r.raceId));
  });
}
