import { Component, Input, OnInit } from '@angular/core';
import { Reminder } from '../../models/reminder.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  @Input() public reminder: Reminder;

  constructor() { }

  ngOnInit(): void {
  }

}
