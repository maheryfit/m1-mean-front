import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {lastValueFrom} from 'rxjs';
import { environment } from '../../environments/environment';

export const isAuthConnected: CanActivateFn =  async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  try {
    return await lastValueFrom(authService.checkAuthConnected())
  } catch (e) {
    console.error(e);
    await router.navigateByUrl("/login");
    return false;
  }
};

export const isAuthClient: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  const promise=authService.checkAuthClient();
  return await promise
    .catch(function (error){
      alert(error);
      router.navigate(["login"]);
      return false;
    }
  );
};

export const isAuthMecanicien: CanActivateFn =  async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  const promise=authService.checkAuthMecanicien();
  return await promise
    .catch(function (error){
        alert(error);
        router.navigate(["login"]);
        return false;
      }
    );
};

export const isAuthManager: CanActivateFn =  async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  const promise=authService.checkAuthManager();
  return await promise
    .catch(function (error){
        alert(error);
        router.navigate(["login"]);
        return false;
      }
    );
};

/*export const isAuthManager: CanActivateFn =  async (route, state) => {
  const router = inject(Router)
  const authService: AuthService = inject(AuthService);
  try {
    return await lastValueFrom(authService.checkAuthManager())
  } catch (e: any) {
    console.error(e);
    await router.navigateByUrl("/login");
    return false;
  }
};*/

export const logout: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router)
  await lastValueFrom(authService.logout())
  await router.navigateByUrl("/");
  return true
}
