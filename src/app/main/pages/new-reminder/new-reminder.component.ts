import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faPlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { cityValidator } from "../../../shared/validators/city.validator"

@Component({
  selector: "app-reminder",
  templateUrl: "./new-reminder.component.html",
  styleUrls: ["./new-reminder.component.scss"],
})
export class NewReminderComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;
  public modalOpen: boolean = false;
  public submitted: boolean = false;
  public newReminderForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this._resetForm();
  }

  ngOnInit(): void { }

  public openModal(): void {
    this.modalOpen = true;
  }

  public closeModal(): void {
    this.modalOpen = false;
    this._resetForm();
  }

  private _resetForm(): void {
    this.submitted = false;
    this.newReminderForm = this._formBuilder.group({
      label: ["", [Validators.required, Validators.maxLength(30)]],
      day: ["", [Validators.required]],
      time: ["", [Validators.required]],
      city: ["", [Validators.required, cityValidator]],
    });
  }

  public submit(): void {
    console.log(this.newReminderForm)
    console.log("submit");
    this.submitted = true;
  }
}
