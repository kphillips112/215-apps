import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { siteGuardsGuard } from './site-guards.guard';

describe('siteGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => siteGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
