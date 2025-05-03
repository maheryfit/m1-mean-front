import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Rdv} from '../../../models/rdv.model';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {ClientService} from '../../../services/client.service';
import {ServicesService} from '../../../services/services.service';
import {ClasseService} from '../../../models/service.model';
import {Paiement} from '../../../models/paiement.model';
import {RdvService} from '../../../services/rdv.service';

@Component({
  selector: 'app-details-rdv',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './details-rdv.component.html',
  styleUrl: './details-rdv.component.css'
})
export class DetailsRdvComponent {
  route=inject(ActivatedRoute)
  idrdv=this.route.snapshot.params['idrdv'];
  pageListeRdv=this.route.snapshot.params['page'];
  clientService=inject(ClientService);
  rdv=signal<Rdv>(new Rdv());

  countServices=signal(0);
  previousIndexService=computed(()=>this.currentIndexService()-1);
  disabledPreviousService=computed(()=>this.currentIndexService()===1);
  currentIndexService=signal(1);
  nextIndexService=computed(()=>this.currentIndexService()+1);
  disabledNextService=computed(()=>this.currentIndexService()*this.pageLimitService>=this.countServices());
  pageLimitService=5;
  serviceService=inject(ServicesService);
  services=signal<ClasseService[]>([]);

  countPaiements=signal(0);
  previousIndexPaiement=computed(()=>this.currentIndexPaiement()-1);
  disabledPreviousPaiement=computed(()=>this.currentIndexPaiement()===1);
  currentIndexPaiement=signal(1);
  nextIndexPaiement=computed(()=>this.currentIndexPaiement()+1);
  disabledNextPaiement=computed(()=>this.currentIndexPaiement()*this.pageLimitPaiement>=this.countPaiements());
  pageLimitPaiement=5;
  rdvService=inject(RdvService);
  paiements=signal<Paiement[]>([]);

  montantInput=new FormControl(0, [Validators.required, Validators.min(100)]);

  erreurService=signal("");
  erreurPayer=signal("");
  constructor(){
    this.clientService.getDetailsRdv(this.idrdv)
      .then((data)=>{
        this.rdv.set(data);
      }).catch((err)=>{
        alert(err);
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
    effect(()=>{
      this.rdvService.getPaiementsOfRdv(this.idrdv,this.currentIndexPaiement(),this.pageLimitPaiement)
        .then(data=>{
          this.paiements.set(data[0]);
          this.countPaiements.set(data[1]);
        }).catch(error => {
        alert(error);
      })
    });
  }
  changePageService(index:number){
    this.currentIndexService.set(index);
  }
  changePagePaiement(index:number){
    this.currentIndexPaiement.set(index);
  }
  choisirService(event:Event,index:number){
    event.preventDefault();
    const serviceToAdd=this.services()[index];
    this.clientService.ajouterServiceRdv(this.idrdv,serviceToAdd)
      .then(()=>{
        this.rdv().services.push(serviceToAdd);
        this.rdv().montant=this.rdv().montant+serviceToAdd.tarif;
        this.rdv().reste_a_payer=this.rdv().reste_a_payer+serviceToAdd.tarif;
        this.rdv().duree=this.rdv().duree+serviceToAdd.duree;
      }).catch(err=>{
        this.erreurService.set(err);
    })
  }
  payer(){
    if(!this.montantInput.valid){
      this.erreurPayer.set("Veuillez saisir un montant correct (min: 100Ar)");
      return;
    }
    const paiementToSend= {
      montant: this.montantInput.value as number
    }
    this.clientService.payerRdv(this.idrdv,paiementToSend)
    .then(()=>{
      this.rdvService.getPaiementsOfRdv(this.idrdv,this.currentIndexPaiement(),this.pageLimitPaiement)
      .then(data=>{
        this.paiements.set(data[0]);
        this.countPaiements.set(data[1]);
        this.rdv().reste_a_payer=this.rdv().reste_a_payer-paiementToSend.montant;
      })
    }).catch(err=>{
      this.erreurPayer.set(err);
    })
  }

  protected readonly environment = environment;
}
