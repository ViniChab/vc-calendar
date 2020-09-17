import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from 'src/app/shared/services/weather/weather.service';

import { Reminder } from "../../../shared/models/reminder.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public reminders: Reminder[] = [];
  public openReminder: Reminder = null;
  public faPlus: IconDefinition = faPlus;
  public isModalOpen: boolean = false;

  constructor(
    private _weatherService: WeatherService,
    private _http: HttpClient
  ) {
    this._getReminders();
  }

  ngOnInit(): void {}

  public onReminderAdded(reminder: Reminder): void {
    this.reminders.push(reminder);
  }

  public onReminderChanged(reminder: Reminder): void {

  }

  public openModal(): void {
    this.isModalOpen = true;
  }

  private _getReminders(): void {
    this._http.get<Reminder[]>("/assets/mockData/mock-reminders.json").subscribe( res => {
      this.reminders.push(...res);
    })
  }
}
