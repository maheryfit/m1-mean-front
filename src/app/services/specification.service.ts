import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Specification } from '../models/specification.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {
  http=inject(HttpClient);
  getSpec(id:string){
    return this.http.get<Specification>(`${environment.API_URL}/specifications/${id}`);
  }
  modifierSpec(id:string, spec:Specification){
    return this.http.put<Specification>(`${environment.API_URL}/specifications/${id}`, spec);
  }
}
