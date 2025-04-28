import {Injectable, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Rdv} from '../models/rdv.model';

@Injectable({
  providedIn: 'root'
})
export class MecanicienService{
  connexion(router:Router,utilisateurToSend:any,erreur:WritableSignal<string>){
    const url=`${environment.API_URL}/mecanicien/connexion`;
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=async function(){
      if(this.readyState===4){
        switch(this.status){
          case 200:
            localStorage.setItem(environment.UTILISATEUR_STORAGE_KEY, this.response);
            await router.navigate(["mecanicien"]);
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
  getRdvEnCours(page:number,limit:number){
    const url=`${environment.API_URL}/mecanicien/liste-rdv/${page}/${limit}`;
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
}
