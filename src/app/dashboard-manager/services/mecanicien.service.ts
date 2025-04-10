import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {MecanicienDetails} from '../../models/mecanicien.model';

@Injectable({
  providedIn: 'root'
})
export class MecanicienService {
    API_URL: string = `${environment.API_URL}`
    constructor(private http: HttpClient) { }


    async getAll() {
        return await lastValueFrom(this.http.get<Array<MecanicienDetails>>(`${this.API_URL}/mecaniciens`))
    }
    async deleteById(id: string) {
        return await lastValueFrom(this.http.delete<any>(`${this.API_URL}/mecaniciens/${id}`))
    }
}
