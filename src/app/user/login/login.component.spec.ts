import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app.routing.module';
import { UserModule } from '../user.module';
import { HomepageComponent } from '../../homepage/homepage.component';
import { GameCanvasComponent } from '../../game/game-canvas/game-canvas.component';
import { InfoComponent } from '../../info/info.component';
import { ProfileComponent } from '../../profile/profile.component';
import { EditProfileComponent } from '../../profile/edit-profile/edit-profile.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageComponent, GameCanvasComponent, InfoComponent, ProfileComponent, EditProfileComponent, 
      PageNotFoundComponent ],
      providers: [ AuthenticationService ],
      imports: [ ReactiveFormsModule, HttpClientModule, AppRoutingModule, UserModule, NgbModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
