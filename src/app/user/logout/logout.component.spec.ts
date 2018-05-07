import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AuthenticationService } from '../authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app.routing.module';
import { UserModule } from '../user.module';
import { HomepageComponent } from '../../homepage/homepage.component';
import { GameCanvasComponent } from '../../game/game-canvas/game-canvas.component';
import { InfoComponent } from '../../info/info.component';
import { ProfileComponent } from '../../profile/profile.component';
import { AppModule } from '../../app.module';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [AuthenticationService],
      imports: [ HttpClientModule, AppRoutingModule, UserModule, AppModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
