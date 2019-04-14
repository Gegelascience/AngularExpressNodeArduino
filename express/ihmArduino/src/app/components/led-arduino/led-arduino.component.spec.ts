import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedArduinoComponent } from './led-arduino.component';

describe('LedArduinoComponent', () => {
  let component: LedArduinoComponent;
  let fixture: ComponentFixture<LedArduinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedArduinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedArduinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
