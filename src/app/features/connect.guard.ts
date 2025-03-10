import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const connectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  console.log(route, state);
  router.navigateByUrl("/");
  return false;
};
