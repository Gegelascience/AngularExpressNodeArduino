import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeopixelsComponent } from './neopixels.component';

describe('NeopixelsComponent', () => {
  let component: NeopixelsComponent;
  let fixture: ComponentFixture<NeopixelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeopixelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeopixelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
