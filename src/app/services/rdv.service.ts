import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Paiement} from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class RdvService{
  async getPaiementsOfRdv(idrdv:string,page:number,limit:number) {
    const url=`${environment.API_URL}/rdv/liste-paiements/${idrdv}/${page}/${limit}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<[Paiement[],number]>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const paiements=[];
              let paiement;
              const count=response[1];
              for(let i=0;i<response[0].length;i++){
                paiement=new Paiement();
                paiement.init(response[0][i]);
                paiements.push(paiement);
              }
              resolve([paiements,count]);
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
