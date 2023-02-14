import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainClassifierFormComponent } from './mountain-classifier-form.component';

describe('MountainClassifierFormComponent', () => {
  let component: MountainClassifierFormComponent;
  let fixture: ComponentFixture<MountainClassifierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MountainClassifierFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MountainClassifierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
