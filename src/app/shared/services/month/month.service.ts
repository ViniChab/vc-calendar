import { Injectable } from '@angular/core';

import { Month } from '../../models/month.model';
import { MonthEnum } from '../../enums/month.enum';
import { WeekDays } from '../../enums/weekdays.enum';
import * as Moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  public currentMonth: Month = {
    name: Moment().format('MMM'),
    week_1: [],
    week_2: [],
    week_3: [],
    week_4: [],
    week_5: [],
    week_6: [],
  };

  constructor() { }

  public setupMonth(): void {
    this._setFirstDays();
    let dayOfMonth = 1;

    for (let weekNumber = 1; weekNumber <= MonthEnum.weeksInAMonth; weekNumber++) {
      let dayOfWeek = this.currentMonth[`week_${weekNumber}`].length;

      while (dayOfWeek < MonthEnum.daysInAWeek) {
        const week = this.currentMonth[`week_${weekNumber}`];
        const date = Moment().date(dayOfMonth++);
        week.push(date);
        dayOfWeek++;
      }
    }
  }


  private _setFirstDays(): void {
    const firstDay = Moment().date(1);
    const weekday = firstDay.isoWeekday();

    this._insertDaysBefore(firstDay, weekday);
  }

  private _insertDaysBefore(day: Moment.Moment, weekday: number): void {
    if (weekday !== WeekDays.sunday) {
      const dayBefore = this._copyWithoutReference(day.subtract(1, "day"));
      this.currentMonth.week_1.push(Moment(dayBefore));

      return this._insertDaysBefore(day, day.isoWeekday());
    }
  }

  private _copyWithoutReference(element: unknown): unknown {
    return JSON.parse(JSON.stringify(element));
  }
}
