import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-client',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent {
  router=inject(Router);
  authService=inject(AuthService);
  brand=environment.BRAND;
  nomUtilisateur;
  menuItems=signal([
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
  activeMenuIndex=signal(0);
  constructor() {
    if(sessionStorage.getItem("menuIndex")===null){
      sessionStorage.setItem("menuIndex","0");
    }
    this.activeMenuIndex.set(Number(sessionStorage.getItem("menuIndex")));
    const utilisateur=localStorage.getItem('utilisateur');
    this.nomUtilisateur = utilisateur===null?"Visiteur":JSON.parse(utilisateur).nom_utilisateur;
  }
  navigateMenu(index:number){
    this.activeMenuIndex.set(index);
    sessionStorage.setItem("menuIndex",index.toString());
  }
  async logout(){
    sessionStorage.removeItem("menuIndex");
    await this.authService.deconnexion(this.router);
  }
}
