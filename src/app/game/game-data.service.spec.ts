import { TestBed, inject } from '@angular/core/testing';

import { GameDataService } from './game-data.service';
import { Http, ConnectionBackend, RequestOptions, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../user/authentication.service';

describe('GameDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDataService, Http, ConnectionBackend, AuthenticationService],
      imports: [HttpClientModule, HttpModule]
    });
  });

  it('should be created', inject([GameDataService], (service: GameDataService) => {
    expect(service).toBeTruthy();
  }));
});
