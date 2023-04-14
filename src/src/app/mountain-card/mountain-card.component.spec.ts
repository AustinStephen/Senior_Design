import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainCardComponent } from './mountain-card.component';

describe('MountainCardComponent', () => {
  let component: MountainCardComponent;
  let fixture: ComponentFixture<MountainCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MountainCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MountainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
