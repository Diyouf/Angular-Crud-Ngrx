import { TestBed } from '@angular/core/testing';

import { ServiecesService } from './servieces.service';

describe('ServiecesService', () => {
  let service: ServiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
