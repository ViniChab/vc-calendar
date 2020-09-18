import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  public isModalOpen = false;

  constructor(private _http: HttpClient) {
    this._getReminders();
  }

  ngOnInit(): void {}

  public onReminderAdded(reminder: Reminder): void {
    this.reminders.push(reminder);
  }

  public onReminderChanged(editedReminder: Reminder): void {
    const indexChanged = this.reminders.indexOf(
      this.reminders.find((reminder) => +reminder.id === +editedReminder.id)
    );

    this.reminders[indexChanged] = editedReminder;
  }

  public openModal(): void {
    this.isModalOpen = true;
  }

  private _getReminders(): void {
    this._http
      .get<Reminder[]>("/assets/mockData/mock-reminders.json")
      .subscribe((res) => {
        this.reminders.push(...res);
      });
  }
}
