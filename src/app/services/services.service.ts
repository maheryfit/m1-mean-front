import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
    http=inject(HttpClient);
    getAll(){
        return this.http.get<Service[]>(`${environment.API_URL}/services`);
    }

    deleteById(id: string) {
        return this.http.delete<void>(`${environment.API_URL}/services/${id}`)
    }
}
