import { TestBed } from '@angular/core/testing';

import { VarglobalesService } from './varglobales.service';

describe('VarglobalesService', () => {
  let service: VarglobalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarglobalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
