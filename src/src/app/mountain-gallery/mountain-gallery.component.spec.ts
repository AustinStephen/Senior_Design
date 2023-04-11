import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainGalleryComponent } from './mountain-gallery.component';

describe('MountainGalleryComponent', () => {
  let component: MountainGalleryComponent;
  let fixture: ComponentFixture<MountainGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MountainGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MountainGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
