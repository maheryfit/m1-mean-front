import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {ClasseService, Service} from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  http=inject(HttpClient);
  getAll(){
    return this.http.get<Service[]>(`${environment.API_URL}/services`);
  }
  getServices(page:number,limit:number){
    const url=`${environment.API_URL}/service/liste-service/${page}/${limit}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<[ClasseService[],number]>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const responseService=response[0];
              const countServices=response[1];
              const services:ClasseService[]=[];
              let service;
              for(let i=0;i<responseService.length;i++){
                service=new ClasseService({});
                service.init(responseService[i]);
                services.push(service);
              }
              resolve([services,countServices]);
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

    deleteById(id: string) {
        return this.http.delete<void>(`${environment.API_URL}/services/${id}`)
    }

    getAllPaginate(index:number, pageLimit: number){
        return this.http.get<Service[]>(`${environment.API_URL}/service/${index}/${pageLimit}`);
    }

    getCount(){
        return this.http.get<number>(`${environment.API_URL}/service/count`);
    }
}
