import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TranslateModule } from '@ngx-translate/core';
import { DayPipe } from './pipes/day.pipe';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';

@NgModule({
  declarations: [
    CalendarComponent,
    GenericModalComponent,
    DayPipe,
  ],
  exports: [
    CalendarComponent,
    GenericModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ]
})

export class SharedModule { }
