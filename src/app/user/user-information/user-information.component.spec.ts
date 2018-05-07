import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationComponent } from './user-information.component';
import { AppModule } from '../../app.module';
import { UserModule } from '../user.module';

describe('UserInformationComponent', () => {
  let component: UserInformationComponent;
  let fixture: ComponentFixture<UserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule, UserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //make a test with mock user to check if username field is his username
  //    usernameEl = fixture.debugElement.query(By.css('input[type=username]'));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
