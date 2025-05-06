import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Client} from '../models/client.model';
import {Abonnement} from '../models/abonnement.model';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  getAbonnements(){
    const url=`${environment.API_URL}/abonnement/liste-abonnements`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<Abonnement[]>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const abonnements=[];
              let abonnement;
              for(let i=0;i<response.length;i++){
                abonnement=new Abonnement();
                abonnement.init(response[i]);
                abonnements.push(abonnement);
              }
              resolve(abonnements);
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
