export class Caracteristique{
  private _nom:string="";
  private _valeur:string="";

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get valeur(): string {
    return this._valeur;
  }

  set valeur(value: string) {
    this._valeur = value;
  }
  init(obj:any){
    this.nom=obj.nom;
    this.valeur=obj.valeur;
  }
}
