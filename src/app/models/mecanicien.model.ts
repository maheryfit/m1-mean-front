import { ObjectModel } from "../object-model.model";

export interface Mecanicien extends ObjectModel{
  utilisateur:{
    nom:string,
    prenom:string,
    nom_utilisateur:string
  },
  telephone:string,
  role:string,
  niveau:string
}
export interface MecanicienDetails extends ObjectModel{
  utilisateur:{
    nom:string,
    prenom:string,
    nom_utilisateur:string
  },
  telephone:string,
  role:{
    titre:string,
    salaire_mensuel:number
  },
  niveau:{
    titre:string,
    coefficient_salarial:number
  }
}
