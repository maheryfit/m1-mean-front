import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-client',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent {
  authService=inject(AuthService);
  router=inject(Router);
  brand=environment.BRAND;
  nomUtilisateur;

  constructor() {
    const utilisateur=localStorage.getItem('utilisateur');
    this.nomUtilisateur = utilisateur===null?"Visiteur":JSON.parse(utilisateur).nom_utilisateur;
  }

  async logout(){
    await this.authService.deconnexion(this.router);
  }
}
