import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCanvasComponent } from './game-canvas.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HiscoresComponent } from '../../hiscores/hiscores.component';
import { NgbModule, NgbAlert, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { HiscoreDataService } from '../../hiscores/hiscore-data.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../user/authentication.service';
//import { AbstractMockObservableService } from '../../AbstractMockObservable.service';
import { AppModule } from '../../app.module';
import { Hiscore } from '../models/hiscore.model';
import { of } from 'rxjs/observable/of';

/**
 * ng test
 */

describe('GameCanvasComponent', () => {
  let component: GameCanvasComponent;
  let fixture: ComponentFixture<GameCanvasComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let serviceStub: any;
  // let myComponent: GameCanvasComponent;
// let myService: HiscoreDataService;

  beforeEach(async(() => {

    // serviceStub = {
    //   bestHiscore: () => of(new Hiscore(1000, 5, 15, "testUser")),
    // };
    
    TestBed.configureTestingModule({
      declarations: [GameCanvasComponent, NgbAlert],
      providers: [ AuthenticationService, NgbAlertConfig, HiscoreDataService ], //{provide: HiscoreDataService, userValue: serviceStub},
      imports: [HttpClientModule]
    }).compileComponents();
      // .compileComponents().then(() => {
      //   fixture = TestBed.createComponent(GameCanvasComponent);
      //    myComponent = TestBed.createComponent(GameCanvasComponent).componentInstance;
      //    myService = TestBed.get(HiscoreDataService);
      //    console.log(myService.bestHiscore());
      //  });;
  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(GameCanvasComponent);
    // myService = TestBed.get(MyService);

    // get test component from the fixture
    component = fixture.componentInstance;
    fixture.detectChanges();  // this line will call components ngOnInit() method
    // component = new GameCanvasComponent(new AbstractMockObservableService(), new AbstractMockObservableService());

  });

  afterEach(() => {
    component
  })
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(GameCanvasComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   component.onGameButtonClick();
  //   expect(app.numberOfBulletsLeft()).toEqual('12');
  // }));

  it("should do a call on the onGameButtonClick method when something called", function() {
    component.onGameButtonClick();
    expect(component.onGameButtonClick()).toHaveBeenCalled();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('starting number of bullets should be 12 at start of game', () => {
  //   // console.log(component);
  //   // expect(component.numberOfBulletsLeft()).toBe('12');
  //   let numberOfBullets: number = component.numberOfBulletsLeft().length;
  //   expect(numberOfBullets).toBe(12);
  // });

  it('number of kills should be 0 at start of game', () => {
    let numberOfKills: number = component.hiscore.kills;
    expect(numberOfKills).toBe(0);
  });

  //  it('number of kills should be 0 at start of game', () => {
  //   let weaponName: string = component.weapon.name;
  //   expect(weaponName).toBe('glock');
  // });

  // it('username should be "testUser"', () => {
  //   let username: string = component.hiscore.username;
  //   expect(username).toBe('testUser');
  // });

  it('should give me the starting number of rounds, which is 1', () => {
    debugElement = fixture.debugElement.query(By.css('#roundNumber'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain('1');
  });

  it('should display the current number of kills, which is 0 at start', () => {
    debugElement = fixture.debugElement.query(By.css('#testNumberOfKills'));
    htmlElement = debugElement.nativeElement;
    //Assert that the text on screen is Number: 0
    // expect(htmlElement.textContent).toEqual('Total number of kills: 1');//WRONG, just to test
    expect(htmlElement.textContent).toEqual('Total number of kills: 0');
    //expect(htmlElement.textContent).toEqual('Number: 0');
  });

  it('should display the round number 1 at start', () => {
    debugElement = fixture.debugElement.query(By.css('#roundNumber'));
    htmlElement = debugElement.nativeElement;
    let roundNumber = htmlElement.textContent.match(/\d+/)[0]

    //Assert that the text on screen is Number: 0
    // expect(htmlElement.textContent).toEqual('Total number of kills: 1');//WRONG, just to test
    // expect(htmlElement.textContent).toEqual('\nRound number: 1');
    expect(roundNumber).toEqual('1');
    //expect(htmlElement.textContent).toEqual('Number: 0');
  });

  it('bots should have a movement speed of 200 ms at start', () => {
    debugElement = fixture.debugElement.query(By.css('#botMovementSpeed'));
    htmlElement = debugElement.nativeElement;
    let botMovementSpeed = htmlElement.textContent.match(/\d+/)[0]
    expect(botMovementSpeed).toEqual('200');

  });


  // it(`should have a button with text 'Start'`, () => {
  //  // const component: GameCanvasComponent = new GameCanvasComponent(null, null); 
  //   expect(component.gameButtonText).toEqual('Start');
  // });

  // it(`should have an attribute hiscore with a score that start with 0`, () => {
  //   const component: GameCanvasComponent = new GameCanvasComponent(null, null);
  //   expect(component.hiscore.score).toEqual(0);
  // });

  // it(`a game should start with 0 kills`, () => {
  //   const component: GameCanvasComponent = new GameCanvasComponent(null, null);
  //   expect(component.numberOfKills).toEqual(0);
  // })
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

// class MockHiscoreService extends A {
//   constructor(){
// super(new HttpClient, new )
//   }
// }

// class MockAuthService extends AuthenticationService {
//   constructor() {
//     super(new HttpClient());
//   }
// }