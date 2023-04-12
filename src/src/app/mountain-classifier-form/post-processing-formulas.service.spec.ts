import { TestBed } from '@angular/core/testing';

import { PostProcessingFormulasService } from './post-processing-formulas.service';

describe('PostProcessingFormulasService', () => {
  let service: PostProcessingFormulasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostProcessingFormulasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
