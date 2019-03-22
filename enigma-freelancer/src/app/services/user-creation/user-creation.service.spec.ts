import { TestBed } from '@angular/core/testing';

import { UserCreationService } from './user-creation.service';

describe('UserCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCreationService = TestBed.get(UserCreationService);
    expect(service).toBeTruthy();
  });
});
