import { TestBed } from '@angular/core/testing';

import { MyGigsService } from './my-gigs.service';

describe('MyGigsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyGigsService = TestBed.get(MyGigsService);
    expect(service).toBeTruthy();
  });
});
