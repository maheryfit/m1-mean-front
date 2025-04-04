import { ObjectModel } from "../object-model.model";

export interface VoitureBase extends ObjectModel{
  proprietaire:string,
  description:string,
  immatriculation:string,
  specification:string,
  images_name:string[]
}
