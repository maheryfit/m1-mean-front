import { Component } from '@angular/core';
import { AbonnementComponent } from './abonnement/abonnement.component';

@Component({
  selector: 'app-profil-client',
  imports: [AbonnementComponent],
  templateUrl: './profil-client.component.html',
  styleUrl: './profil-client.component.css'
})
export class ProfilClientComponent {
  abonnements=[
    {
      id:"1",
      nom:"bronze",
      couleur:"btn-outline-secondary",
      prix:"5000",
      checked:false
    },
    {
      id:"2",
      nom:"silver",
      couleur:"btn-outline-light",
      prix:"10000",
      checked:true
    },
    {
      id:"3",
      nom:"gold",
      couleur:"btn-outline-warning",
      prix:"15000",
      checked:false
    }
  ]
}
