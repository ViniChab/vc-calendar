import { Pipe, PipeTransform } from '@angular/core';

import { Month } from '../models/month.model';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  public transform(month: Month, ...args: number[]): string {
    const weekNumber = args[0] + 1;
    const dayOfWeek = args[1];

    const week = month[`week_${weekNumber}`];
    const day = week[dayOfWeek];
    return day.format("DD");
  }
}
