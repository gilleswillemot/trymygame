import { TestBed, inject } from '@angular/core/testing';

import { HiscoreDataService } from './hiscore-data.service';

describe('HiscoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HiscoreDataService]
    });
  });

  it('should be created', inject([HiscoreDataService], (service: HiscoreDataService) => {
    expect(service).toBeTruthy();
  }));
});
