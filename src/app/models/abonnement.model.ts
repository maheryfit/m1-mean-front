export class Abonnement{
  private _idabonnement:string="";
  private _nom:string="";
  private _prix:number=0;
  private _pourcentage_reduction:number=0;

  get idabonnement(): string {
    return this._idabonnement;
  }

  set idabonnement(value: string) {
    this._idabonnement = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prix(): number {
    return this._prix;
  }

  set prix(value: number) {
    this._prix = value;
  }

  get pourcentage_reduction(): number {
    return this._pourcentage_reduction;
  }

  set pourcentage_reduction(value: number) {
    this._pourcentage_reduction = value;
  }

  init(obj:any){
    this.idabonnement=obj._id;
    this.nom=obj.nom;
    this.prix=obj.prix;
    this.pourcentage_reduction=obj.pourcentage_reduction;
  }
}
