import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as Moment from "moment";

import { WeatherService } from "../../../shared/services/weather/weather.service";
import { Reminder } from "src/app/shared/models/reminder.model";

@Component({
  selector: "app-reminder",
  templateUrl: "./reminder.component.html",
  styleUrls: ["./reminder.component.scss"],
})
export class ReminderComponent implements OnChanges {
  @Input() public nextId: number;
  @Input() public reminder: Reminder;
  @Input() public modalOpen = false;
  @Output() public added = new EventEmitter();
  @Output() public edited = new EventEmitter();
  @Output() public modalClose = new EventEmitter();
  public reminderForm: FormGroup;
  public submitted = false;
  public isEdit = false;
  public isCityValid = true;
  public loadingSubmit = false;
  public loadingInfo = false;

  @ViewChild("city") private _city: ElementRef;

  constructor(
    private _weatherService: WeatherService,
    private _formBuilder: FormBuilder
  ) {
    this.reminderForm = this._formBuilder.group({
      label: ["", [Validators.required, Validators.maxLength(30)]],
      day: ["", [Validators.required]],
      time: ["", [Validators.required]],
      city: ["", [Validators.required]],
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.reminder?.currentValue) {
      this.loadingInfo = true;
      this._weatherService.getForecast(simpleChanges.reminder?.currentValue).then( reminder => {
        this._setFormEdit(reminder);
        this.loadingInfo = false;
      });
    }
  }

  public closeModal(): void {
    this.reminder = null;
    this.modalClose.emit();
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

    if (this.reminderForm.valid) {
      this.loadingSubmit = true;
      this.validateCity(this._city.nativeElement.value)
        .then((res) => {
          const reminderForm: Reminder = this.reminderForm.getRawValue();
          reminderForm.day = Moment(reminderForm.day, "DD/MM/YYYY");
          reminderForm.time = Moment(reminderForm.time, "HH:mm");

          if (this.isEdit) {
            reminderForm.id = this.reminder.id || this.nextId;
            this.edited.emit(reminderForm);
          } else {
            reminderForm.id = this.nextId;
            this.added.emit(reminderForm);
          }

          this.closeModal();
        })
        .catch((error) => {
          this.isCityValid = false;
          this.loadingSubmit = false;
        });
    }
  }

  private _resetForm(): void {
    this.submitted = false;
    this.isEdit = false;
    this.loadingSubmit = false;
    this.isCityValid = true;
    this.reminderForm.reset();
  }

  private _setFormEdit(reminder: Reminder): void {
    const day = Moment(reminder.day).format("DD/MM/YYYY");
    const time =
      typeof reminder.time === "string"
        ? reminder.time
        : Moment(reminder.time).format("HH:mm");

    this.reminderForm = this._formBuilder.group({
      label: [reminder.label, [Validators.required, Validators.maxLength(30)]],
      day: [day, [Validators.required]],
      time: [time, [Validators.required]],
      city: [reminder.city, [Validators.required]],
      forecast: [reminder.forecast],
    });

    this.isEdit = true;
  }
}
