import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Station } from '../models/station.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  http=inject(HttpClient)
  getStations(index:number, pagelimit:number){
    return this.http.get<Station[]>(`${environment.API_URL}/stations/${index}/${pagelimit}`);
  }
  count(){
    return this.http.get<number>(`${environment.API_URL}/stations/count`);
  }
}
