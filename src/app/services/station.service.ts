import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {ClasseStation, Station} from '../models/station.model';
import { environment } from '../../environments/environment';
import {ClasseVoiture} from '../models/voiture.model';

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
  getStations(page:number,limit:number){
    const url=`${environment.API_URL}/station/${page}/${limit}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<ClasseStation[]>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const stations:ClasseStation[]=[];
              let station;
              for(let i=0;i<response.length;i++){
                station=new ClasseStation();
                station.init(response[i]);
                stations.push(station);
              }
              resolve(stations);
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("GET", url, true);
      xhr.withCredentials=true;
      xhr.send();
    });
    return promise;
  }
  countStations(){
    const url=`${environment.API_URL}/station/count`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<number>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              resolve(JSON.parse(this.response));
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("GET", url, true);
      xhr.withCredentials=true;
      xhr.send();
    });
    return promise;
  }
}
