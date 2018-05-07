import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import { UserInformationComponent } from '../../user/user-information/user-information.component';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from '../../user/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app.routing.module';
import { UserModule } from '../../user/user.module';
import { HomepageComponent } from '../../homepage/homepage.component';
import { GameCanvasComponent } from '../../game/game-canvas/game-canvas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoComponent } from '../../info/info.component';
import { ProfileComponent } from '../profile.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileComponent, HomepageComponent, GameCanvasComponent, InfoComponent, ProfileComponent,
        PageNotFoundComponent]
      , providers: [AuthenticationService,]
      , imports: [ReactiveFormsModule, HttpClientModule, UserModule, AppRoutingModule, NgbModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
