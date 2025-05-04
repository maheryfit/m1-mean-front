import {Component, inject} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  clientService=inject(ClientService);
  client:Client|null = null;
  constructor(){
    this.clientService.detailsProfil()
      .then(response => this.client = response)
      .catch(error => alert(error));
  }
}
