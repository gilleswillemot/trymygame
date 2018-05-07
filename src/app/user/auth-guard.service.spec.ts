import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app.routing.module';
import { HomepageComponent } from '../homepage/homepage.component';
import { GameCanvasComponent } from '../game/game-canvas/game-canvas.component';
import { InfoComponent } from '../info/info.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AlertComponent } from '../alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserModule } from './user.module';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent, GameCanvasComponent, InfoComponent, ProfileComponent,
      EditProfileComponent, PageNotFoundComponent],
      providers: [AuthGuardService, AuthenticationService],
      imports: [HttpClientModule, AppRoutingModule, NgbModule, UserModule]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
