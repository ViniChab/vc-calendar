import { Component, OnInit } from "@angular/core";

import { MonthService } from "../../services/month/month.service";
import { MonthEnum } from "../../enums/month.enum";
import { WeekDays } from "../../enums/weekDays.enum";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  public readonly monthEnum = MonthEnum;
  public readonly weekDays = WeekDays;

  constructor(public monthService: MonthService) {
    this.monthService.setupMonth();
  }

  ngOnInit(): void {}

  public isOffMonth(weekNumber: number, dayOfWeek: number): boolean {
    const week = this.monthService.currentMonth["week_" + (weekNumber + 1)];
    const monthName = week[dayOfWeek].format("MMM");

    return monthName != this.monthService.currentMonth.name;
  }

  public isWeekend(weekNumber: number, dayOfWeek: number): boolean {
    return dayOfWeek == this.weekDays.sunday || dayOfWeek == this.weekDays.saturday;
  }
}
