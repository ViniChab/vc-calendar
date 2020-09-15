import { Component, OnInit } from "@angular/core";

import { Month } from "../../models/month.model";
import * as Moment from "moment";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  public readonly daysInAWeek = 7;
  public readonly weeksInAMonth = 6;

  public currentMonth: Month = {
    week_1: [],
    week_2: [],
    week_3: [],
    week_4: [],
    week_5: [],
    week_6: [],
  };

  public readonly defaultFormat = "DD/MM/YYYY";

  constructor() {
    this._setupMonth();
  }

  ngOnInit(): void {}

  private _setupMonth(): void {
    let dayOfMonth = 1;
    this._setFirstDays();

    for (let weekNumber = 1; weekNumber <= this.weeksInAMonth; weekNumber++) {
      let dayOfWeek = this.currentMonth[`week_${weekNumber}`].length;

      while (dayOfWeek < this.daysInAWeek) {
        this.currentMonth[`week_${weekNumber}`].push(Moment().date(dayOfMonth++));
        dayOfWeek++;
      }
    }

    console.log(this.currentMonth);
  }

  private _setFirstDays(): void {
    const firstDay = Moment().date(1);
    const weekday = firstDay.isoWeekday();
    this._insertDaysBefore(firstDay, weekday);
  }

  private _insertDaysBefore(day: Moment.Moment, weekday: number): void {
    if (weekday !== 7) {
      const dayBefore = JSON.parse(JSON.stringify(day.subtract(1, "day")));
      this.currentMonth.week_1.push(Moment(dayBefore));
      return this._insertDaysBefore(day, day.isoWeekday());
    }
  }
}
