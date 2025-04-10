import { ObjectModel } from "../object-model.model";

export interface Service extends ObjectModel{
  nom:string,
  description:string,
  duree_estimee:number,
  tarif:{
    $numberDecimal:number
  }
}
