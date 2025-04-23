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
    filtrePathClientVoiture(){
      const utilisateur=localStorage.getItem(environment.UTILISATEUR_STORAGE_KEY);
      if(utilisateur===null){
        return "/login";
      }
      const utilisateurParsed=JSON.parse(utilisateur);
      if(utilisateurParsed.profil===environment.PROFIL_CLIENT){
        return "/client/voitures/liste/1";
      }
      return "/login";
    }
  filtrePathClientStation(){
    const utilisateur=localStorage.getItem(environment.UTILISATEUR_STORAGE_KEY);
    if(utilisateur===null){
      return "/login";
    }
    const utilisateurParsed=JSON.parse(utilisateur);
    if(utilisateurParsed.profil===environment.PROFIL_CLIENT){
      return "/client/stations/liste/1";
    }
    return "/login";
  }
}
