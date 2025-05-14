import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {MecanicienDetails} from '../../../models/mecanicien.model';
import {Service} from '../../../models/service.model';
import {RoleMecanicien} from '../models/role-mecanicien.model';

@Injectable({
  providedIn: 'root'
})
export class RoleMecanicienService {

    API_URL: string = `${environment.API_URL}`
    constructor(private http: HttpClient) { }


    async getAll() {
        return await lastValueFrom(this.http.get<Array<RoleMecanicien>>(`${this.API_URL}/roleMecaniciens`))
    }

    deleteById(id: string) {
        return this.http.delete<any>(`${this.API_URL}/roleMecaniciens/${id}`)
    }

    getAllPaginate(index:number, pageLimit: number){
        return this.http.get<RoleMecanicien[]>(`${this.API_URL}/roleMecaniciens/${index}/${pageLimit}`);
    }

    getCount(){
        return this.http.get<number>(`${this.API_URL}/roleMecaniciens/count`);
    }
}
