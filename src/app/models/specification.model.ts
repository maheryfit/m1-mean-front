import { ObjectModel } from "../object-model.model";

export interface Specification extends ObjectModel{
  modele:string,
  type:string,
  moteur:string,
  transmission:string,
  traction:string
}
