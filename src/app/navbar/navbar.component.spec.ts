import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AppRoutingModule } from '../app.routing.module';
import { HomepageComponent } from '../homepage/homepage.component';
import { GameCanvasComponent } from '../game/game-canvas/game-canvas.component';
import { HiscoresComponent } from '../hiscores/hiscores.component';
import { InfoComponent } from '../info/info.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NgbModule, NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';
import { UserModule } from '../user/user.module';
import { HttpClientModule } from '@angular/common/http';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, HomepageComponent, GameCanvasComponent, HiscoresComponent, InfoComponent,
        EditProfileComponent, AlertComponent, PageNotFoundComponent, ProfileComponent ],
        providers: [NgbDropdownConfig],

      imports:[AppRoutingModule, NgbModule, UserModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
