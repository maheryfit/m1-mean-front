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
