import {Client} from './client.model';
import {Rdv} from './rdv.model';

export class Paiement{
  private _idpaiement:string="";
  private _client:Client=new Client();
  private _dateheure:Date=new Date();
  private _montant:number=0;
  private _etat:number=0;
  private _idrdv:string="";

  get idrdv(): string {
    return this._idrdv;
  }

  set idrdv(value: string) {
    this._idrdv = value;
  }

  get idpaiement(): string {
    return this._idpaiement;
  }

  set idpaiement(value: string) {
    this._idpaiement = value;
  }

  get client(): Client {
    return this._client;
  }

  set client(value: Client) {
    this._client = value;
  }

  get dateheure(): Date {
    return this._dateheure;
  }

  set dateheure(value: Date) {
    this._dateheure = value;
  }

  get montant(): number {
    return this._montant;
  }

  set montant(value: number) {
    this._montant = value;
  }

  get etat(): number {
    return this._etat;
  }

  set etat(value: number) {
    this._etat = value;
  }
  init(obj:any){
    this.idpaiement=obj._id;
    this.client=new Client();
    if(obj.client!==undefined){
      this.client.init(obj.client);
    }
    this.dateheure=obj.dateheure;
    this.montant=obj.montant;
    this.etat=obj.etat;
    this.idrdv=obj.idrdv;
  }
}
