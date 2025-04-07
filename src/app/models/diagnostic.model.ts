import { ObjectModel } from "../object-model.model";
import { Mecanicien } from "./mecanicien.model";

export interface Diagnostic extends ObjectModel{
  rdv:string,
  evaluations:string,
  dateheure:Date,
  mecaniciens:Mecanicien[],
  etat:string
}
export interface DiagnosticAjout{
  rdv:string,
  evaluations:string,
  mecaniciens:string[]
}
