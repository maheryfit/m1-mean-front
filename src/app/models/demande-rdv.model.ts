import { ObjectModel } from "../object-model.model"
import { Station } from "./station.model"
import { VoitureBase } from "./voiture-base.model"
import { VoitureProprietaire } from "./voiture.model"

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
export interface DemandeRdvMecanicien extends ObjectModel{
  voiture:VoitureProprietaire,
  station:Station,
  description:string,
  date_favorable:Date,
  etat:string
}
