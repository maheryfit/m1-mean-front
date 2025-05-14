import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {ClasseStation, Station} from '../models/station.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  http=inject(HttpClient)
  // getStations(index:number, pagelimit:number){
  //   return this.http.get<Station[]>(`${environment.API_URL}/stations/${index}/${pagelimit}`);
  // }
  count(){
    return this.http.get<number>(`${environment.API_URL}/stations/count`);
  }

  getAll() {
      return this.http.get<Station[]>(`${environment.API_URL}/station`);
  }

  getStations(page:number,limit:number){
    const url=`${environment.API_URL}/station/liste-station/${page}/${limit}`;
    const xhr=new XMLHttpRequest();
    return new Promise<[ClasseStation[], number]>(function (resolve, reject) {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          switch (this.status) {
            case 200:
              const response = JSON.parse(this.response);
              const responseStation = response[0];
              const countStations = response[1];
              const stations: ClasseStation[] = [];
              let station;
              for (let i = 0; i < responseStation.length; i++) {
                station = new ClasseStation({});
                station.init(responseStation[i]);
                stations.push(station);
              }
              resolve([stations, countStations]);
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("GET", url, true);
      xhr.withCredentials = true;
      xhr.send();
    });
  }

  deleteById(id: string) {
        return this.http.delete<any>(`${environment.API_URL}/stations/${id}`)
  }

}
