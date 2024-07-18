import { TestBed } from '@angular/core/testing';

import { AccessDbService } from './people.service';

describe('AccessDbService', () => {
  let service: AccessDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
