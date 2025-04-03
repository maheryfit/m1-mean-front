import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DemandeRdv, DemandeRdvDetails } from '../models/demande-rdv.model';
import { environment } from '../../environments/environment';
import { Diagnostic } from '../models/diagnostic.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeRdvService {
  http=inject(HttpClient)
  creerDemande(demande:DemandeRdv){
    return this.http.post<DemandeRdv>(`${environment.API_URL}/demandeRDVDiagnostics`, demande);
  }
  getAll(index:number, pageLimit:number){
    return this.http.get<DemandeRdvDetails[]>(`${environment.API_URL}/demandeRDVDiagnostics/${index}/${pageLimit}`);
  }
  count(){
    return this.http.get<number>(`${environment.API_URL}/demandeRDVDiagnostics/count`);
  }
  get(id:string){
    return this.http.get<DemandeRdvDetails>(`${environment.API_URL}/demandeRDVDiagnostics/${id}`);
  }
  getDiagnostics(iddemande:string, index:number, pagelimit:number){
    return this.http.get<Diagnostic[]>(`${environment.API_URL}/diagnostics/${iddemande}/${index}/${pagelimit}`);
  }
  countDiagnostics(iddemande:string){
    return this.http.get<number>(`${environment.API_URL}/diagnostics/count/${iddemande}`);
  }
}
