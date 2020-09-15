import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TranslateModule } from '@ngx-translate/core';
import { DayPipe } from './pipes/day.pipe';

@NgModule({
  declarations: [
    CalendarComponent,
    DayPipe
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ]
})

export class SharedModule { }
