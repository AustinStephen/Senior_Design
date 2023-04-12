import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainClassifierModalComponent } from './mountain-classifier-modal.component';

describe('MountainClassifierModalComponent', () => {
  let component: MountainClassifierModalComponent;
  let fixture: ComponentFixture<MountainClassifierModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MountainClassifierModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MountainClassifierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
