import { Component, OnInit } from '@angular/core';

import { Reminder } from '../../../shared/models/reminder.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public reminders: Reminder[] = [];
  constructor() { }

  ngOnInit(): void { }

  public onReminderAdded(reminder: Reminder): void {
    this.reminders.push(reminder);
  }
}
