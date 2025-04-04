import { QteArticle } from "./article.model"
import { Remise } from "./remise.model"

export interface Devis{
  voiture:string,
  services:string[],
  station:string,
  diagnostic:string,
  articles_quantites:QteArticle[],
  mecanicien:string,
  duree_estimee:number,
  montant:number,
  dateheure_debut_maintenance:Date,
  remises:Remise[]
}
