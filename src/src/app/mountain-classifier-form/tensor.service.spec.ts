import { TestBed } from '@angular/core/testing';

import { TensorService } from './tensor.service';

describe('ImageServiceService', () => {
  let service: TensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
