import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Voiture } from '../models/voiture.model';
import { environment } from '../../environments/environment';
import { User } from '../pages/core/auth/auth.model';
import { VoitureBase } from '../models/voiture-base.model';

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
  modifierVoiture(id:string|null, voiture:VoitureBase){
    return this.http.put<Voiture>(`${environment.API_URL}/voitures/${id}`, voiture);
  }
}
