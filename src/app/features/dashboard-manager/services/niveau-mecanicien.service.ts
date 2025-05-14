import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {NiveauMecanicien} from '../models/niveau-mecanicien.model';

@Injectable({
  providedIn: 'root'
})
export class NiveauMecanicienService {

    API_URL: string = `${environment.API_URL}`
    constructor(private http: HttpClient) { }


    async getAll() {
        return await lastValueFrom(this.http.get<Array<NiveauMecanicien>>(`${this.API_URL}/niveauMecaniciens`))
    }

    deleteById(id: string) {
        return this.http.delete<any>(`${this.API_URL}/niveauMecaniciens/${id}`)
    }

    getAllPaginate(index:number, pageLimit: number){
        return this.http.get<NiveauMecanicien[]>(`${this.API_URL}/niveauMecaniciens/${index}/${pageLimit}`);
    }

    getCount(){
        return this.http.get<number>(`${this.API_URL}/niveauMecaniciens/count`);
    }
}
