import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from "@ngx-translate/core";

import { ReminderComponent } from "./reminder.component";
import { AppModule } from ".././../../app.module";
import { SharedModule } from "src/app/shared/shared.module";
import { FormGroup } from '@angular/forms';

describe("ReminderComponent", () => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;
  let form: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderComponent],
      imports: [
        HttpClientModule,
        AppModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    form = component.reminderForm;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return error (label is a required field)", () => {
    form.setValue({
      label: "",
      day: "2020-10-01",
      time: "13:45",
      city: "Itajaí",
    });

    expect(form.controls["label"].errors.required).toEqual(true);
  });

  it("should return error (label should have less than 30 characters)", () => {
    form.setValue({
      label: "this is a long label that should be problematic because of its size",
      day: "2020-10-01",
      time: "13:45",
      city: "Itajaí",
    });

    expect(form.controls["label"].errors.maxlength).toEqual({
      requiredLength: 30,
      actualLength: 67,
    });
  });

  it("should return error (day is a required field)", () => {
    form.setValue({
      label: "Test",
      day: "",
      time: "13:45",
      city: "Itajaí",
    });

    expect(form.controls["day"].errors.required).toEqual(true);
  });

  it("should return error (time is a required field)", () => {
    form.setValue({
      label: "Test",
      day: "2020-10-01",
      time: "",
      city: "Itajaí",
    });

    expect(form.controls["time"].errors.required).toEqual(true);
  });

  it("should return error (city is a required field)", () => {
    form.setValue({
      label: "Test",
      day: "2020-10-01",
      time: "13:45",
      city: "",
    });

    expect(form.controls["city"].errors.required).toEqual(true);
  });
});
