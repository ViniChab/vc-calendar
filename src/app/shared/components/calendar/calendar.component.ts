import { Component, OnInit } from "@angular/core";

import { MonthService } from "../../services/month/month.service";
import { MonthEnum } from "../../enums/month.enum";
import { WeekDays } from "../../enums/weekDays.enum";
import * as Moment from 'moment';

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
    const currentMonth = this.monthService.currentMonth.today.format('MMM');

    return monthName != currentMonth;
  }

  public nextMonth(): void {
    const nextMonth = this.monthService.getDesiredMonth('next');
    this.monthService.setupMonth(nextMonth.month());
  }

  public previousMonth(): void {
    const previousMonth = this.monthService.getDesiredMonth('previous');
    this.monthService.setupMonth(previousMonth.month());
  }

  public isWeekend(dayOfWeek: number): boolean {
    return dayOfWeek == this.weekDays.sunday || dayOfWeek == this.weekDays.saturday;
  }

  public get selectedMonth(): string {
    return this.monthService.currentMonth.today.format("MMM");
  }

  public get currentYear(): string {
    return this.monthService.currentYear;
  }
}
