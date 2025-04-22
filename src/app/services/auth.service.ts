import { Injectable, WritableSignal } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Auth, MyHttpError, User} from '../core/auth/auth.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ChattingService} from '../features/chatting/chatting.service';
import { Router } from '@angular/router';
import { MecanicienDetails } from '../models/mecanicien.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: Auth): Observable<HttpResponse<User|MyHttpError>> {
    return this.http.post<User>(`${environment.API_URL}/user/login`, user, {observe:'response'});
  }

  logout(): Observable<any> {
    // this.chattingService.emitOffline();
    localStorage.removeItem("id")
    localStorage.removeItem("nom_utilisateur")
    localStorage.removeItem("profil")
    return this.http.get<any>(`${environment.API_URL}/user/logout`);
  }

  checkAuthConnected(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.API_URL}/user/checkAuthConnected`);
  }

  // checkAuthClient(): Observable<boolean> {
  //   return this.http.get<boolean>(`${environment.API_URL}/user/checkAuthClient`);
  // }

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

  async filtreRedirection(user:User){
    const paths : { [key:string] : string } = {
      "client" : "/client",
      "mécanicien" : "/mecanicien",
      "manager" : "/manager"
    };
    await this.router.navigate([paths[user.profil]]);
  }

  getMecanicien(user:User){
    return this.http.get<MecanicienDetails>(`${environment.API_URL}/mecaniciens/findByUser/${user.id}`);
  }

  // ========================================================================================================================

  checkAuthClient(){
    const url=`${environment.API_URL}/utilisateur/checkAuthClient`;
    const promise=new Promise<boolean>(function (resolve){
      const xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function (){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              resolve(JSON.parse(this.response));
              break;
            case 500:
              throw new Error(JSON.parse(this.response).message);
          }
        }
      }
      xhr.open("GET", url, true);
      xhr.withCredentials=true;
      xhr.send();
    });
    return promise;
  }

}
