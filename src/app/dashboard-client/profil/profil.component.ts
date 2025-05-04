import {Component, inject, signal} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';
import {Abonnement} from '../../models/abonnement.model';
import { AbonnementService } from '../../services/abonnement.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-profil',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  clientService=inject(ClientService);
  abonnementService=inject(AbonnementService);
  client = signal(new Client());
  abonnements:Abonnement[]=[];

  abonnementForm=new FormGroup({
    abonnement:new FormControl()
  });

  erreurAbonnement=signal("");
  constructor(){
    this.clientService.detailsProfil()
      .then(response => {
        this.client.set(response);
        this.abonnementForm.patchValue({
          abonnement:response.abonnement.idabonnement
        })
      })
      .catch(error => alert(error));
    this.abonnementService.getAbonnements()
      .then(response => {
        this.abonnements = response;
      })
      .catch(error => alert(error));
  }
  changerAbonnement(){
    const abonnementToSend={
      idabonnement:this.abonnementForm.value.abonnement
    }
    this.clientService.changerAbonnement(abonnementToSend)
      .then(()=>{
        for(let i=0;i<this.abonnements.length;i++){
          if(this.abonnements[i].idabonnement===abonnementToSend.idabonnement){
            this.client().abonnement=this.abonnements[i];
            break;
          }
        }
      }).catch(error => this.erreurAbonnement.set(error));
  }
}
