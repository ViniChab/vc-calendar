import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { TranslateModule } from "@ngx-translate/core";
import { DayPipe } from "./pipes/day.pipe";
import { GenericModalComponent } from "./components/generic-modal/generic-modal.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { WeatherDetailsComponent } from "./components/weather-details/weather-details.component";
import { LoadingComponent } from "./components/loading/loading.component";

@NgModule({
  declarations: [
    CalendarComponent,
    GenericModalComponent,
    DayPipe,
    WeatherDetailsComponent,
    LoadingComponent,
  ],
  exports: [
    CalendarComponent,
    GenericModalComponent,
    WeatherDetailsComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, TranslateModule, FontAwesomeModule],
})
export class SharedModule {}
