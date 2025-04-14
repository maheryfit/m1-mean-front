import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {MecanicienDetails} from '../../../models/mecanicien.model';
import {Service} from '../../../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class MecanicienService {
    API_URL: string = `${environment.API_URL}`
    constructor(private http: HttpClient) { }


    async getAll() {
        return await lastValueFrom(this.http.get<Array<MecanicienDetails>>(`${this.API_URL}/mecaniciens`))
    }

    deleteById(id: string) {
        return this.http.delete<any>(`${this.API_URL}/mecaniciens/${id}`)
    }

    getAllPaginate(index:number, pageLimit: number){
        return this.http.get<Service[]>(`${this.API_URL}/mecaniciens/${index}/${pageLimit}`);
    }

    getCount(){
        return this.http.get<number>(`${this.API_URL}/mecaniciens/count`);
    }
}
