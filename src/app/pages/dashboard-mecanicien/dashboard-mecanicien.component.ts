import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-mecanicien',
  imports: [RouterLink, RouterOutlet, SidebarComponent],
  templateUrl: './dashboard-mecanicien.component.html',
  styleUrl: './dashboard-mecanicien.component.css'
})
export class DashboardMecanicienComponent{
  router=inject(Router);
  authService=inject(AuthService);
  brand=environment.BRAND;
  nomUtilisateur;
  menuItems=signal([
    {
      lien:"/mecanicien/rdvs/liste",
      icon:"fa fa-car-alt me-2",
      active:"active",
      label:"Rendez-vous",
    }
  ]);
  constructor() {
    const utilisateur=localStorage.getItem('utilisateur');
    this.nomUtilisateur = utilisateur===null?"Visiteur":JSON.parse(utilisateur).nom_utilisateur;
  }
  async logout(){
    await this.authService.deconnexion(this.router);
  }
}
