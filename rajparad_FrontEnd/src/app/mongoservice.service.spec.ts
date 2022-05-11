import { TestBed } from '@angular/core/testing';

import { MongoserviceService } from './mongoservice.service';

describe('MongoserviceService', () => {
  let service: MongoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
