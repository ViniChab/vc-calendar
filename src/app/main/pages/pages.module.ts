import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NewReminderComponent } from './new-reminder/new-reminder.component';

@NgModule({
  declarations: [
    HomeComponent,
    NewReminderComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})

export class PagesModule { }
