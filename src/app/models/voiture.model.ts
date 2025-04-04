import { ObjectModel } from "../object-model.model";
import { Specification } from "./specification.model";
import { Utilisateur } from "./utilisateur.model";

export interface Voiture extends ObjectModel{
  proprietaire:string,
  description:string,
  immatriculation:string,
  specification:Specification,
  images_name:string[]
}
export interface VoitureProprietaire extends ObjectModel{
  proprietaire:Utilisateur,
  description:string,
  immatriculation:string,
  specification:Specification,
  images_name:string[]
}
