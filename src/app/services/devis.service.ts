import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DevisAjout } from '../models/devis.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  http=inject(HttpClient)
  creerDevis(devis:DevisAjout){
    return this.http.post(`${environment.API_URL}/devis`, devis);
  }
}
