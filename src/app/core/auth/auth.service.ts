import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from './auth.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: Auth) {
    return this.http.post<Auth>(`${environment.API_URL}/login`, user);
  }
}
