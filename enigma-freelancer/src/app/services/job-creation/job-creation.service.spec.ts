import { TestBed } from '@angular/core/testing';

import { JobCreationService } from './job-creation.service';

describe('JobCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobCreationService = TestBed.get(JobCreationService);
    expect(service).toBeTruthy();
  });
});
