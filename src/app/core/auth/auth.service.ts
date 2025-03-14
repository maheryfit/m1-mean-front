import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth, User} from './auth.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${environment.API_URL}/user/login`, user);
  }

  logout(): Observable<any> {
    localStorage.removeItem("id")
    localStorage.removeItem("nom_utilisateur")
    localStorage.removeItem("profil")
    return this.http.get<any>(`${environment.API_URL}/user/logout`);
  }

  checkAuthConnected(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.API_URL}/user/checkAuthConnected`);
  }

  checkAuthMecanicien(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.API_URL}/user/checkAuthMecanicien`);
  }

  checkAuthManager(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.API_URL}/user/checkAuthManager`);
  }

  storeUserToLocalStorage(user: User) {
    localStorage.setItem("id", user.id);
    localStorage.setItem("nom_utilisateur", user.nom_utilisateur);
    localStorage.setItem("profil", user.profil);
  }

}
