import {Injectable, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

    constructor() { }

    connexion(router:Router,utilisateurToSend:any,erreur:WritableSignal<string>){
        const url=`${environment.API_URL}/manager/connexion`;
        const xhr=new XMLHttpRequest();
        xhr.onreadystatechange=async function(){
            if(this.readyState===4){
                switch(this.status){
                    case 200:
                        localStorage.setItem(environment.UTILISATEUR_STORAGE_KEY, this.response);
                        await router.navigate(["manager"]);
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
}
