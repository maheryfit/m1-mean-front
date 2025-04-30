import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService{
  filtrePathGeneral(){
    const utilisateur=localStorage.getItem(environment.UTILISATEUR_STORAGE_KEY);
    if(utilisateur===null){
      return "/login";
    }
    const utilisateurParsed=JSON.parse(utilisateur);
    switch(utilisateurParsed.profil){
      case environment.PROFIL_CLIENT:
        return "/client";
      case environment.PROFIL_MECANICIEN:
        return "/mecanicien";
      default:
        return "/login";
    }
  }
  filtrePathProfil(targetProfil:number,targetUrl:string){
    const utilisateur=localStorage.getItem(environment.UTILISATEUR_STORAGE_KEY);
    if(utilisateur===null){
      return "/login";
    }
    const utilisateurParsed=JSON.parse(utilisateur);
    if(utilisateurParsed.profil===targetProfil){
      return targetUrl;
    }
    return "/login";
  }
}
