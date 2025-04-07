import { ObjectModel } from "../object-model.model";

export interface Article extends ObjectModel{
  nom:string,
  description:string,
  marque:{
    nom:string
  },
  unite:string,
  prix_unitaire:{
    $numberDecimal:number
  },
  type:string
}
export interface QteArticle{
  article:string,
  quantite:number
}
