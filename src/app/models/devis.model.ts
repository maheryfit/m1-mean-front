import { QteArticle, QteArticleDetails } from "./article.model"
import { Mecanicien } from "./mecanicien.model"
import { Remise } from "./remise.model"
import { Service } from "./service.model"
import { Station } from "./station.model"
import { VoitureProprietaire } from "./voiture.model"

export interface Devis{
  voiture:VoitureProprietaire,
  services:Service[],
  station:Station,
  diagnostic:string,
  articles_quantites:QteArticleDetails[],
  mecanicien:Mecanicien,
  duree_estimee:number,
  montant:{
    $numberDecimal:number
  },
  dateheure_devis:Date,
  dateheure_debut_maintenance:Date,
  remises:Remise[]
}

export interface DevisAjout{
  voiture:string,
  services:string[],
  station:string,
  diagnostic:string,
  articles_quantites:QteArticle[],
  mecanicien:string,
  dateheure_debut_maintenance:Date
}
