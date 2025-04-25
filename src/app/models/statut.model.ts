export class Statut{
  private _idstatut:string="";
  private _nom:string="";
  private _pourcentage_reduction:number=0;

  get idstatut(): string {
    return this._idstatut;
  }

  set idstatut(value: string) {
    this._idstatut = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get pourcentage_reduction(): number {
    return this._pourcentage_reduction;
  }

  set pourcentage_reduction(value: number) {
    this._pourcentage_reduction = value;
  }

  init(obj:any) {
    this.idstatut = obj._id;
    this.nom = obj.nom;
    this.pourcentage_reduction = obj.pourcentage_reduction;
  }
}
