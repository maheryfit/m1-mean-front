import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Voiture } from '../../models/voiture.model';
import { environment } from '../../../environments/environment';
import { User } from '../../core/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class VoituresService {

  constructor() { }
  http=inject(HttpClient);
  getAllVoitures(index:number, pagelimit:number){
    return this.http.get<Voiture[]>(`${environment.API_URL}/voitures/${index}/${pagelimit}`);
  }
  count(){
    return this.http.get<number>(`${environment.API_URL}/voitures/compte`);
  }
  getVoiture(id:string|null){
    return this.http.get<Voiture>(`${environment.API_URL}/voitures/${id}`);
  }
}
