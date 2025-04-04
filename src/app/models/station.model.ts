import { ObjectModel } from "../object-model.model";

export interface Station extends ObjectModel{
  nom:string,
  lieu:string,
  coordonnees:{
    type:string,
    coordinates:number[]
  }
}
