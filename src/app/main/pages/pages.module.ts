import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";

import { ReminderComponent } from "./reminder/reminder.component";
import { SharedModule } from "../../shared/shared.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [HomeComponent, ReminderComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class PagesModule {}
