import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DemandeRdv } from '../models/demande-rdv.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeRdvService {
  http=inject(HttpClient)
  creerDemande(demande:DemandeRdv){
    return this.http.post<DemandeRdv>(`${environment.API_URL}/demandeRDVDiagnostics`, demande);
  }
}
