import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ClasseStation} from '../../../../models/station.model';
import {ClientService} from '../../../../services/client.service';
import {ClasseVoiture} from '../../../../models/voiture.model';
import {ServicesService} from '../../../../services/services.service';
import {ClasseService} from '../../../../models/service.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Abonnement} from '../../../../models/abonnement.model';
import {Statut} from '../../../../models/statut.model';

@Component({
  selector: 'app-creer-rdv',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './creer-rdv.component.html',
  styleUrl: './creer-rdv.component.css'
})
export class CreerRdvComponent {
  route=inject(ActivatedRoute);
  lastPageStation=this.route.snapshot.params['pageStation'];
  idstation=this.route.snapshot.params['idstation'];
  station=new ClasseStation({});
  abonnement=new Abonnement();
  statut=new Statut();
  voitureChoisie=signal<ClasseVoiture|null>(null);
  servicesChoisis=signal<ClasseService[]>([]);

  countVoitures=signal(0);
  previousIndexVoiture=computed(()=>this.currentIndexVoiture()-1);
  disabledPreviousVoiture=computed(()=>this.currentIndexVoiture()===1);
  currentIndexVoiture=signal(1);
  nextIndexVoiture=computed(()=>this.currentIndexVoiture()+1);
  disabledNextVoiture=computed(()=>this.currentIndexVoiture()*this.pageLimitVoiture>=this.countVoitures());
  pageLimitVoiture=5;
  clientService=inject(ClientService);
  voitures=signal<ClasseVoiture[]>([]);

  countServices=signal(0);
  previousIndexService=computed(()=>this.currentIndexService()-1);
  disabledPreviousService=computed(()=>this.currentIndexService()===1);
  currentIndexService=signal(1);
  nextIndexService=computed(()=>this.currentIndexService()+1);
  disabledNextService=computed(()=>this.currentIndexService()*this.pageLimitService>=this.countServices());
  pageLimitService=5;
  serviceService=inject(ServicesService);
  services=signal<ClasseService[]>([]);

  rdvForm=new FormGroup({
    descriptionRdv:new FormControl("Bruit étrange",Validators.required),
    dateRdv:new FormControl(new Date().toISOString().slice(0,-1),Validators.required),
  });
  erreur=signal("");
  duree=signal(0);
  montant=signal(0);
  montantReduction=computed(()=>this.montant()*(this.abonnement.pourcentage_reduction+this.statut.pourcentage_reduction)/100);
  montantFinal=computed(()=>this.montant()-this.montantReduction());

  router=inject(Router);
  constructor() {
    this.clientService.interfaceCreerRdv(this.idstation)
      .then(data => {
        this.station = data[0];
        this.abonnement=data[1];
        this.statut=data[2];
      }).catch(error => {
        alert(error);
      });
    effect(()=>{
      this.clientService.getVoitures(this.currentIndexVoiture(),this.pageLimitVoiture)
        .then(data=>{
          this.voitures.set(data[0]);
          if(this.voitures().length>0&&this.voitureChoisie()===null){
            this.voitureChoisie.set(this.voitures()[0]);
          }
          this.countVoitures.set(data[1]);
        }).catch(error => {
          alert(error);
      })
    });
    effect(()=>{
      this.serviceService.getServices(this.currentIndexService(),this.pageLimitService)
        .then(data=>{
          this.services.set(data[0]);
          this.countServices.set(data[1]);
        }).catch(error => {
        alert(error);
      })
    });
  }
  changePageVoiture(index:number){
    this.currentIndexVoiture.set(index);
  }
  changePageService(index:number){
    this.currentIndexService.set(index);
  }
  choisirVoiture(event:Event,indexVoiture:number){
    event.preventDefault();
    this.voitureChoisie.set(this.voitures()[indexVoiture]);
  }
  choisirService(event:Event,indexService:number){
    event.preventDefault();
    const service=this.services()[indexService];
    this.servicesChoisis().push(service);
    this.duree.set(this.duree()+service.duree);
    this.montant.set(this.montant()+service.tarif);
  }
  retirerService(event:Event,idservice:string){
    event.preventDefault();
    for(let i=0;i<this.servicesChoisis().length;i++){
      if(this.servicesChoisis()[i].idservice === idservice){
        this.duree.set(this.duree()-this.servicesChoisis()[i].duree);
        this.montant.set(this.montant()-this.servicesChoisis()[i].tarif);
        this.servicesChoisis().splice(i,1);
        return;
      }
    }
  }
  creerRdv(){
    if(!this.rdvForm.valid){
      this.erreur.set("Veuillez fournir une description et date à votre demande de rendez-vous.");
      return;
    }
    if(this.servicesChoisis().length===0||this.voitureChoisie()===null){
      this.erreur.set("Au moins un service et une voiture sont requis pour demander un rendez-vous au garage.");
      return;
    }
    const resteAPayer=this.montantFinal();
    const remises=[];
    if(this.abonnement.pourcentage_reduction>0){
      remises.push({
        nom:this.abonnement.nom,
        pourcentage:this.abonnement.pourcentage_reduction,
      })
    }
    if(this.statut.pourcentage_reduction>0){
      remises.push({
        nom:this.statut.nom,
        pourcentage:this.statut.pourcentage_reduction,
      })
    }
    const rdvToSend={
      description:this.rdvForm.value.descriptionRdv,
      dateheure:this.rdvForm.value.dateRdv,
      services:this.servicesChoisis(),
      voiture:this.voitureChoisie(),
      duree:this.duree(),
      montant:this.montantFinal(),
      reste_a_payer:resteAPayer,
      remises:remises,
      station:this.station
    }
    this.clientService.creerRdv(rdvToSend)
      .then(async (data)=>{
        await this.router.navigate(["client","rdvs","details",this.lastPageStation,data._id]);
      }).catch(error => {
        this.erreur.set(error);
      })
  }
}
