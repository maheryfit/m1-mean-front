import {Injectable, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {ClasseVoiture, Voiture} from '../models/voiture.model';

@Injectable({
  providedIn: "root",
})
export class ClientService{
  inscription(router:Router,utilisateurToSend:any,erreur:WritableSignal<string>){
    const url=`${environment.API_URL}/client/inscription`;
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
    const url=`${environment.API_URL}/client/connexion`;
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
                voiture=new ClasseVoiture();
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
              const voiture=new ClasseVoiture();
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
}
