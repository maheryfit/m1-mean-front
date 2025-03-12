import {CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../core/auth/auth.service';
import {lastValueFrom} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export const isAuthConnected: CanActivateFn =  async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  try {
    const value = await lastValueFrom(authService.checkAuthConnected())
    console.log(value)
    return value
  } catch (e) {
    console.error(e);
    await router.navigateByUrl("/login");
    return false;
  }
};

export const isAuthMecanicien: CanActivateFn =  async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  try {
    const value = await lastValueFrom(authService.checkAuthMecanicien())
    console.log(value)
    return value
  } catch (e: any) {
    console.error(e);
    await router.navigateByUrl("/login");
    return false;
  }
};

export const isAuthManager: CanActivateFn =  async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  try {
    const value = await lastValueFrom(authService.checkAuthManager())
    console.log(value)
    return value
  } catch (e: any) {
    console.error(e);
    await router.navigateByUrl("/login");
    return false;
  }
};

export const logout: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router)
  await lastValueFrom(authService.logout())
  await router.navigateByUrl("/");
  return true
}
