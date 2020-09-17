import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faPlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import * as Moment from 'moment';

import { WeatherService } from "../../../shared/services/weather/weather.service";
import { Reminder } from 'src/app/shared/models/reminder.model';

@Component({
  selector: "app-reminder",
  templateUrl: "./new-reminder.component.html",
  styleUrls: ["./new-reminder.component.scss"],
})
export class NewReminderComponent implements OnInit {

  @Output() public added = new EventEmitter();
  public faPlus: IconDefinition = faPlus;
  public modalOpen: boolean = false;
  public submitted: boolean = false;
  public isCityValid: boolean = true;
  public loading: boolean = false;
  public newReminderForm: FormGroup;

  @ViewChild("city") private _city: ElementRef;

  constructor(
    private _weatherService: WeatherService,
    private _formBuilder: FormBuilder
  ) {
    this._resetForm();
  }

  ngOnInit(): void {}

  public openModal(): void {
    this.modalOpen = true;
  }

  public closeModal(): void {
    this.modalOpen = false;
    this._resetForm();
  }

  public validateCity(city: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._weatherService.isCityValid(city).subscribe((res) => {
        res ? resolve() : reject();
      });
    });
  }

  public submit(): void {
    this.submitted = true;

    if (this.newReminderForm.valid) {
      this.loading = true;
      this.validateCity(this._city.nativeElement.value).then(res => {
        const reminderForm: Reminder = this.newReminderForm.getRawValue();
        reminderForm.day = Moment(reminderForm.day, "DD/MM/YYYY");
        reminderForm.time = Moment(reminderForm.time, "HH:mm");

        this.added.emit(reminderForm);
        this.closeModal();
      }).catch(error => {
        this.isCityValid = false;
        this.loading = false;
      })
    }
  }

  private _resetForm(): void {
    this.submitted = false;
    this.loading = false;
    this.isCityValid = true;
    this.newReminderForm = this._formBuilder.group({
      label: ["", [Validators.required, Validators.maxLength(30)]],
      day: ["", [Validators.required]],
      time: ["", [Validators.required]],
      city: ["", [Validators.required]],
    });
  }
}
