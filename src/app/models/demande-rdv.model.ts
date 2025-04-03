import { ObjectModel } from "../object-model.model"
import { Station } from "./station.model"
import { VoitureBase } from "./voiture-base.model"

export interface DemandeRdv{
  voiture:string,
  station:string,
  description:string,
  date_favorable:Date
}
export interface DemandeRdvDetails extends ObjectModel{
  voiture:VoitureBase,
  station:Station,
  description:string,
  date_favorable:Date,
  etat:string
}
