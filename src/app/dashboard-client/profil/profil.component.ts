import {Component, inject} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';
import {Abonnement} from '../../models/abonnement.model';
import { AbonnementService } from '../../services/abonnement.service';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  clientService=inject(ClientService);
  abonnementService=inject(AbonnementService);
  client:Client|null = null;
  abonnements:Abonnement[]=[];
  constructor(){
    this.clientService.detailsProfil()
      .then(response => this.client = response)
      .catch(error => alert(error));
    this.abonnementService.getAbonnements()
      .then(response => this.abonnements = response)
      .catch(error => alert(error));
  }
}
