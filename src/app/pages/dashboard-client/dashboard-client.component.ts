import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-client',
  imports: [RouterLink, RouterOutlet, SidebarComponent],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent extends SidebarComponent{
  router=inject(Router);
  authService=inject(AuthService);
  brand=environment.BRAND;
  nomUtilisateur;
  override menuItems=signal([
    {
      lien:"/client/voitures",
      icon:"fa fa-car-alt me-2",
      active:"",
      label:"Voitures",
    },
    {
      lien:"/client/stations",
      icon:"bi-map me-2",
      active:"",
      label:"Stations",
    },
    {
      lien:"/client/rdvs",
      icon:"bi-list me-2",
      active:"",
      label:"Maintenances",
    }
  ]);
  constructor() {
    super();
    const utilisateur=localStorage.getItem('utilisateur');
    this.nomUtilisateur = utilisateur===null?"Visiteur":JSON.parse(utilisateur).nom_utilisateur;
  }
  async logout(){
    sessionStorage.removeItem("menuIndex");
    await this.authService.deconnexion(this.router);
  }
}
