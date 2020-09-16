import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReminderComponent } from './new-reminder.component';

describe('NewReminderComponent', () => {
  let component: NewReminderComponent;
  let fixture: ComponentFixture<NewReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
