import { TestBed } from '@angular/core/testing';

import { UltrasonService } from './ultrason.service';

describe('UltrasonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UltrasonService = TestBed.get(UltrasonService);
    expect(service).toBeTruthy();
  });
});
