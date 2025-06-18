import {Injectable, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {ClasseVoiture, Voiture} from '../models/voiture.model';
import {ClasseStation} from '../models/station.model';
import {Abonnement} from '../models/abonnement.model';
import {Statut} from '../models/statut.model';
import {Rdv} from '../models/rdv.model';
import {ClasseService} from '../models/service.model';
import {Paiement} from '../models/paiement.model';
import {Client} from '../models/client.model';

@Injectable({
  providedIn: "root",
})
export class ClientService{
  inscription(router:Router,utilisateurToSend:any,erreur:WritableSignal<string>){
    const url=`${environment.API_URL}/user/register`;
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=async function(){
      if(this.readyState===4){
        switch(this.status){
          case 200:
            await router.navigate(["login"]);
            break;
          case 500:
            erreur.set(JSON.parse(this.response).message);
            break;
        }
      }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.send(JSON.stringify(utilisateurToSend));
  }

  connexion(router:Router,utilisateurToSend:any,erreur:WritableSignal<string>){
    const url=`${environment.API_URL}/user/login`;
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=async function(){
      if(this.readyState===4){
        switch(this.status){
          case 200:
            localStorage.setItem(environment.UTILISATEUR_STORAGE_KEY, this.response);
            await router.navigate(["client"]);
            break;
          case 500:
            erreur.set(JSON.parse(this.response).message);
            break;
        }
      }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.withCredentials=true;
    xhr.send(JSON.stringify(utilisateurToSend));
  }
  getVoitures(page:number,limit:number){
    const url=`${environment.API_URL}/client/liste-voiture/${page}/${limit}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<[ClasseVoiture[],number]>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const responseVoitures=response[0];
              const countVoitures=response[1];
              const voitures:ClasseVoiture[]=[];
              let voiture;
              for(let i=0;i<responseVoitures.length;i++){
                voiture=new ClasseVoiture({});
                voiture.init(responseVoitures[i]);
                voitures.push(voiture);
              }
              resolve([voitures,countVoitures]);
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
  creerVoiture(voiture:any){
    const url=`${environment.API_URL}/client/creer-voiture`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<ClasseVoiture>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const data=JSON.parse(this.response);
              const voiture=new ClasseVoiture({});
              voiture.init(data);
              resolve(voiture);
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
      xhr.withCredentials=true;
      xhr.send(JSON.stringify(voiture));
    });
    return promise;
  }
  supprimerVoiture(idvoiture:string){
    const url=`${environment.API_URL}/client/supprimer-voiture/${idvoiture}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<void>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              resolve();
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("DELETE", url, true);
      xhr.withCredentials=true;
      xhr.send();
    });
    return promise;
  }
  interfaceCreerRdv(idstation:string){
    const url=`${environment.API_URL}/client/interface-creer-rdv/${idstation}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<[ClasseStation,Abonnement,Statut]>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const station=new ClasseStation({});
              station.init(response[0]);
              const abonnement=new Abonnement();
              abonnement.init(response[1]);
              const statut=new Statut();
              statut.init(response[2]);
              resolve([station,abonnement,statut]);
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
  creerRdv(rdvToSend:any){
    const url=`${environment.API_URL}/client/creer-rdv`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<any>(function (resolve,reject){
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
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
      xhr.withCredentials=true;
      xhr.send(JSON.stringify(rdvToSend));
    });
    return promise;
  }
  getRdvEnCours(page:number,limit:number){
    const url=`${environment.API_URL}/client/liste-rdv/${page}/${limit}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<[Rdv[],number]>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const rdvs:Rdv[]=[];
              const rdvsReceived=response[0];
              const countRdv=response[1];
              let rdv;
              for(let i=0;i<rdvsReceived.length;i++){
                rdv=new Rdv();
                rdv.init(rdvsReceived[i]);
                rdvs.push(rdv);
              }
              resolve([rdvs,countRdv]);
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
  getDetailsRdv(idrdv:string){
    const url=`${environment.API_URL}/client/details-rdv/${idrdv}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<Rdv>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const rdv=new Rdv();
              rdv.init(response);
              resolve(rdv);
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
  ajouterServiceRdv(idrdv:string,service:ClasseService){
    const url=`${environment.API_URL}/client/ajouter-service-rdv/${idrdv}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<void>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              resolve();
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
      xhr.withCredentials=true;
      xhr.send(JSON.stringify(service));
    });
    return promise;
  }
  retirerServiceRdv(idrdv:string,service:ClasseService){
    const url=`${environment.API_URL}/client/retirer-service-rdv/${idrdv}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<void>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              resolve();
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
      xhr.withCredentials=true;
      xhr.send(JSON.stringify(service));
    });
    return promise;
  }
  payerRdv(idrdv:string,paiement:any){
    const url=`${environment.API_URL}/client/payer-rdv/${idrdv}`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<void>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              resolve();
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
      xhr.withCredentials=true;
      xhr.send(JSON.stringify(paiement));
    });
    return promise;
  }
  detailsProfil(){
    const url=`${environment.API_URL}/client/details-profil`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<Client>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              const response=JSON.parse(this.response);
              const client=new Client();
              client.init(response);
              resolve(client);
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
  changerAbonnement(abonnement:any){
    const url=`${environment.API_URL}/client/changer-abonnement`;
    const xhr=new XMLHttpRequest();
    const promise=new Promise<void>(function (resolve,reject){
      xhr.onreadystatechange=function(){
        if(this.readyState===4){
          switch(this.status){
            case 200:
              resolve();
              break;
            case 500:
              reject(JSON.parse(this.response).message);
              break;
          }
        }
      }
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
      xhr.withCredentials=true;
      xhr.send(JSON.stringify(abonnement));
    });
    return promise;
  }
}
