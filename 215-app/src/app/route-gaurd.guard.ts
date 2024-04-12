import { CanActivateFn } from '@angular/router';

export const arbitraryGuard: CanActivateFn = (route, state) => {
  return false;
};
