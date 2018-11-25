import { TestBed, async, inject } from '@angular/core/testing';

import { DefectiveServiceGuard } from './defective-service.guard';

describe('DefectiveServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefectiveServiceGuard]
    });
  });

  it('should ...', inject([DefectiveServiceGuard], (guard: DefectiveServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
