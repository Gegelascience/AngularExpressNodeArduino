import { TestBed } from '@angular/core/testing';

import { ArduinoOnOffService } from './arduino-on-off.service';

describe('ArduinoOnOffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArduinoOnOffService = TestBed.get(ArduinoOnOffService);
    expect(service).toBeTruthy();
  });
});
