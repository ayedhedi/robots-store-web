import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotUpdateComponent } from './robot-update.component';

describe('RobotUpdateComponent', () => {
  let component: RobotUpdateComponent;
  let fixture: ComponentFixture<RobotUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
