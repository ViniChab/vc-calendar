import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as Moment from 'moment';

import { MonthService } from "../../services/month/month.service";
import { Reminder } from '../../models/reminder.model';
import { WeatherService } from '../../services/weather/weather.service';
import { MonthEnum } from '../../enums/month.enum';

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  public readonly monthEnum = MonthEnum;
  @Input() public reminders: Reminder[];
  @Output() public openReminder = new EventEmitter();

  constructor(
    public monthService: MonthService,
    public weatherService: WeatherService
  ) {
    this.monthService.setupMonth();
  }

  ngOnInit(): void {}

  public nextMonth(): void {
    const nextMonth = this.monthService.getDesiredMonth('next');
    this.monthService.setupMonth(nextMonth.month());
  }

  public previousMonth(): void {
    const previousMonth = this.monthService.getDesiredMonth('previous');
    this.monthService.setupMonth(previousMonth.month());
  }

  public remindersThisDay(weekNumber: number, dayOfWeek: number) {
    const week = this.monthService.getWeek(weekNumber);
    if (week) {
      const remindersThisDay = this.reminders.filter( reminder => {
        if (Moment(reminder.day).isSame(week[dayOfWeek], "day"))
          return reminder;
      })
      return remindersThisDay;
    }
    return [];
  }

  public emitOpenReminder(reminder: Reminder): void {
    this.openReminder.emit(reminder);
  }

  public get selectedMonth(): string {
    return this.monthService.currentMonth.today.format("MMM");
  }

  public get currentYear(): string {
    return this.monthService.currentYear;
  }
}
