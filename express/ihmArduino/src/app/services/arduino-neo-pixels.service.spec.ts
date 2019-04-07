import { TestBed } from '@angular/core/testing';

import { ArduinoNeoPixelsService } from './arduino-neo-pixels.service';

describe('ArduinoNeoPixelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArduinoNeoPixelsService = TestBed.get(ArduinoNeoPixelsService);
    expect(service).toBeTruthy();
  });
});
