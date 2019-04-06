import { TestBed } from '@angular/core/testing';

import { ArduinoTemperatureService } from './arduino-temperature.service';

describe('ArduinoTemperatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArduinoTemperatureService = TestBed.get(ArduinoTemperatureService);
    expect(service).toBeTruthy();
  });
});
