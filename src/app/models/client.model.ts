export class Client{
  private _idclient:string="";
  private _nom:string="";
  private _prenom:string="";
  private _date_inscription:Date=new Date();
  private _telephone:string="";

  get idclient(): string {
    return this._idclient;
  }

  set idclient(value: string) {
    this._idclient = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get date_inscription(): Date {
    return this._date_inscription;
  }

  set date_inscription(value: Date) {
    this._date_inscription = value;
  }

  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }
}
