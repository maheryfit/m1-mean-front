import {ClasseService} from './service.model';
import {ClasseVoiture} from './voiture.model';
import {ClasseStation} from './station.model';
import {Client} from './client.model';
import {ClasseMecanicien} from './mecanicien.model';

export class Rdv{
  private _idrdv:string="";
  private _description:string="";
  private _dateheure:Date=new Date();
  private _services:ClasseService[]=[];
  private _voiture:ClasseVoiture=new ClasseVoiture({});
  private _duree:number=0;
  private _montant:number=0;
  private _reste_a_payer:number=0;
  private _remises:{nom:string,pourcentage:number}[]=[];
  private _station:ClasseStation=new ClasseStation({});
  private _diagnostics:{evaluation:string,dateheure:Date}[]=[];
  private _etat:number=0;
  private _client:Client=new Client();
  private _mecanicien:ClasseMecanicien|null=null;

  get mecanicien(): ClasseMecanicien|null {
    return this._mecanicien;
  }

  set mecanicien(value: ClasseMecanicien) {
    this._mecanicien = value;
  }

  get client(): Client {
    return this._client;
  }

  set client(value: Client) {
    this._client = value;
  }

  get idrdv(): string {
    return this._idrdv;
  }

  set idrdv(value: string) {
    this._idrdv = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get dateheure(): Date {
    return this._dateheure;
  }

  set dateheure(value: Date) {
    this._dateheure = value;
  }

  get services(): ClasseService[] {
    return this._services;
  }

  set services(value: ClasseService[]) {
    this._services = value;
  }

  get voiture(): ClasseVoiture {
    return this._voiture;
  }

  set voiture(value: ClasseVoiture) {
    this._voiture = value;
  }

  get duree(): number {
    return this._duree;
  }

  set duree(value: number) {
    this._duree = value;
  }

  get montant(): number {
    return this._montant;
  }

  set montant(value: number) {
    this._montant = value;
  }

  get reste_a_payer(): number {
    return this._reste_a_payer;
  }

  set reste_a_payer(value: number) {
    this._reste_a_payer = value;
  }

  get remises(): { nom: string; pourcentage: number }[] {
    return this._remises;
  }

  set remises(value: { nom: string; pourcentage: number }[]) {
    this._remises = value;
  }

  get station(): ClasseStation {
    return this._station;
  }

  set station(value: ClasseStation) {
    this._station = value;
  }

  get diagnostics(): { evaluation: string; dateheure: Date }[] {
    return this._diagnostics;
  }

  set diagnostics(value: { evaluation: string; dateheure: Date }[]) {
    this._diagnostics = value;
  }

  get etat(): number {
    return this._etat;
  }

  set etat(value: number) {
    this._etat = value;
  }
  init(obj:any){
    this.idrdv=obj._id;
    this.description=obj.description;
    this.dateheure=obj.dateheure;
    this.duree=obj.duree;
    this.montant=obj.montant;
    this.reste_a_payer=obj.reste_a_payer;
    this.remises=obj.remises;
    this.etat=obj.etat;
    this.services=[];
    this.voiture=new ClasseVoiture(obj.voiture);
    this.remises=obj.remises;
    this.station=new ClasseStation(obj.station);
    this.diagnostics=obj.diagnostics;
    this.client=new Client();
    if(obj.client!==undefined){
      this.client.init(obj.client);
    }
    if(obj.services===undefined){
      return;
    }
    for(let i=0;i<obj.services.length;i++){
      this.services.push(new ClasseService(obj.services[i]));
    }
  }
}
