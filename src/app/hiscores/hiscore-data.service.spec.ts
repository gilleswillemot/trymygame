import { TestBed, inject } from '@angular/core/testing';

import { HiscoreDataService } from './hiscore-data.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../user/authentication.service';

describe('HiscoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HiscoreDataService, AuthenticationService],
      imports: [HttpClientModule, HttpModule]

    });
  });

  it('should be created', inject([HiscoreDataService], (service: HiscoreDataService) => {
    expect(service).toBeTruthy();
  }));
});
