import { Injectable } from '@angular/core';

import { Month } from '../../models/month.model';
import { MonthEnum } from '../../enums/month.enum';
import { MomentWeekDays } from '../../enums/momentWeekdays.enum';
import * as Moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  public currentYear = Moment().format('YYYY');
  public currentMonthNumber = Moment().month();
  public currentMonth: Month = {
    today: Moment(),
    week_1: [],
    week_2: [],
    week_3: [],
    week_4: [],
    week_5: [],
    week_6: [],
  };

  constructor() { }

  public setupMonth(month = Moment().month()): void {
    this._reset(month)
    this._setFirstDays(month);
    let dayOfMonth = 1;

    for (let weekNumber = 1; weekNumber <= MonthEnum.weeksInAMonth; weekNumber++) {
      let dayOfWeek = this.currentMonth[`week_${weekNumber}`].length;

      while (dayOfWeek < MonthEnum.daysInAWeek) {
        const week = this.currentMonth[`week_${weekNumber}`];
        const date = Moment().month(month).date(dayOfMonth++);
        week.push(date);
        dayOfWeek++;
      }
    }
  }

  public getDesiredMonth(type: "next" | "previous"): Moment.Moment {
    const currentMonthNumber = this.currentMonthNumber;
    let desiredMonth: Moment.Moment;

    if (type == "next") {
      this.currentMonthNumber++;
      desiredMonth = Moment().month(currentMonthNumber).add(1, 'month');
    } else {
      this.currentMonthNumber--;
      desiredMonth = Moment().month(currentMonthNumber).subtract(1, 'month');
    }

    this.currentYear = desiredMonth.format('YYYY');
    return desiredMonth;
  }

  private _setFirstDays(month: number): void {
    const firstDay = Moment().month(month).date(1);
    const weekday = firstDay.isoWeekday();

    this._insertDaysBefore(firstDay, weekday);
  }

  private _insertDaysBefore(day: Moment.Moment, weekday: number): void {
    if (weekday !== MomentWeekDays.sunday) {
      const dayBefore = this._copyWithoutReference(day.subtract(1, "day"));
      this.currentMonth.week_1.push(Moment(dayBefore));

      return this._insertDaysBefore(day, day.isoWeekday());
    }
  }

  private _copyWithoutReference(element: unknown): unknown {
    return JSON.parse(JSON.stringify(element));
  }

  private _reset(month) {
    this.currentMonth = {
      today: Moment().month(month),
      week_1: [],
      week_2: [],
      week_3: [],
      week_4: [],
      week_5: [],
      week_6: []
    };
  }
}
