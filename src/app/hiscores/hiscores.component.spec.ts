import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiscoresComponent } from './hiscores.component';
import { NgbModule, NgbAccordion, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';
import { HiscoreDataService } from './hiscore-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../user/authentication.service';

describe('HiscoresComponent', () => {
  let component: HiscoresComponent;
  let fixture: ComponentFixture<HiscoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HiscoresComponent, AlertComponent]
      , providers:[HiscoreDataService, AuthenticationService, NgbAccordionConfig],
      imports: [NgbModule, HttpClientModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`should have a title of 'Hiscore Rankings'`, () => {
  //   // const component: GameCanvasComponent = new GameCanvasComponent(null, null); 
  //   //  const fixture = TestBed.createComponent(HiscoresComponent);
  //   //  const comp = fixture.debugElement.componentInstance;
  //   //  expect(comp.title).toEqual(undefined);
  //  });
});
