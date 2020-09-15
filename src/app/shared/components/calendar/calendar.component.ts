import { Component, OnInit } from "@angular/core";

import { MonthService } from "../../services/month/month.service"
import { MonthEnum } from '../../enums/month.enum';

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  public readonly monthEnum = MonthEnum;

  constructor(public monthService: MonthService) {
    this.monthService.setupMonth();
  }

  ngOnInit(): void {}
}
