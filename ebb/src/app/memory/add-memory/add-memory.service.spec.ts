import { TestBed } from '@angular/core/testing';

import { AddMemoryService } from './add-memory.service';

describe('AddMemoryService', () => {
  let service: AddMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
