import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MecanicienService} from '../../../services/mecanicien.service';
import {Rdv} from '../../../models/rdv.model';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';

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
  mecanicienService=inject(MecanicienService);
  rdv=signal<Rdv>(new Rdv());
  evaluationInput=new FormControl("", Validators.required);
  erreurDiagnostic=signal("");
  erreurPriseCharge=signal("");
  erreurCloture=signal("");
  constructor(){
    this.mecanicienService.getDetailsRdv(this.idrdv)
      .then((data)=>{
        this.rdv.set(data);
      }).catch((err)=>{
        alert(err);
    })
  }
  ajouterDiagnostic(){
    if(!this.evaluationInput.valid){
      this.erreurDiagnostic.set("L'évaluation ne peut pas être vide lors du diagnostic.");
      return;
    }
    const diagnosticToSend={
      evaluation:this.evaluationInput.value as string,
      dateheure:new Date()
    }
    this.mecanicienService.ajouterDiagnostic(this.idrdv,diagnosticToSend)
      .then(()=>{
        this.rdv().diagnostics.push(diagnosticToSend);
      }).catch((err)=>{
        this.erreurDiagnostic.set(err);
    })
  }
  prendreChargeRdv(){
    this.mecanicienService.prendreChargeRdv(this.idrdv)
      .then((data)=>{
        this.rdv().mecanicien=data;
      })
      .catch((error)=>{
        this.erreurPriseCharge.set(error);
      })
  }
  cloturerRdv(){
    this.mecanicienService.cloturerRdv(this.idrdv)
      .then(()=>{
        this.rdv().etat=this.environment.ETAT_RDV_CLOS;
      })
      .catch((error)=>{
        this.erreurCloture.set(error);
      })
  }

  protected readonly environment = environment;
}
