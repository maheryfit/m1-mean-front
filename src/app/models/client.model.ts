import {Abonnement} from './abonnement.model';
import {Statut} from './statut.model';

export class Client{
  private _idclient:string="";
  private _nom:string="";
  private _prenom:string="";
  private _date_inscription:Date=new Date();
  private _telephone:string="";
  private _abonnement:Abonnement=new Abonnement();
  private _statut:Statut=new Statut();
  private _utilisateur:{_id:string,nom_utilisateur:string}={_id:"",nom_utilisateur:""};

  get utilisateur(): { _id: string; nom_utilisateur: string } {
    return this._utilisateur;
  }

  set utilisateur(value: { _id: string; nom_utilisateur: string }) {
    this._utilisateur = value;
  }

  get abonnement(): Abonnement {
    return this._abonnement;
  }

  set abonnement(value: Abonnement) {
    this._abonnement = value;
  }

  get statut(): Statut {
    return this._statut;
  }

  set statut(value: Statut) {
    this._statut = value;
  }

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
  init(obj:any){
    this.idclient=obj.idclient;
    this.nom=obj.nom;
    this.prenom=obj.prenom;
    this.date_inscription=obj.date_inscription;
    this.telephone=obj.telephone;
    this.abonnement=new Abonnement();
    if(obj.abonnement!==undefined){
      this.abonnement.init(obj.abonnement);
    }
    this.statut=new Statut();
    if(obj.statut!==undefined){
      this.statut.init(obj.statut);
    }
    this.utilisateur=obj.utilisateur;
  }
}
