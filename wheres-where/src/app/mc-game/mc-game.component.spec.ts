import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McGameComponent } from './mc-game.component';

describe('McGameComponent', () => {
  let component: McGameComponent;
  let fixture: ComponentFixture<McGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
