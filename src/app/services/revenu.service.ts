import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenuService {
    API_URL = environment.API_URL


    constructor(private http: HttpClient) {}

    async getRevenueAnnuel(year: Number = new Date().getFullYear()) {
        return await lastValueFrom(this.http.get(`${this.API_URL}/revenues/revenue/${year}`))
    }

    async getBeneficeAnnuel(year: Number = new Date().getFullYear()) {
        return await lastValueFrom(this.http.get(`${this.API_URL}/revenues/benefice/${year}`))
    }
}
