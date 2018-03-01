import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverlayComponent } from './game-overlay.component';

describe('GameOverlayComponent', () => {
  let component: GameOverlayComponent;
  let fixture: ComponentFixture<GameOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
