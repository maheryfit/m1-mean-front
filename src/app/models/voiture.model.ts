import { ObjectModel } from "../object-model.model";
import { Specification } from "./specification.model";

export interface Voiture extends ObjectModel{
  proprietaire:string,
  description:string,
  immatriculation:string,
  specification:Specification,
  images_name:string[]
}
