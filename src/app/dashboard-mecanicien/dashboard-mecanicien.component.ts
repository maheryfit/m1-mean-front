import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-mecanicien',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard-mecanicien.component.html',
  styleUrl: './dashboard-mecanicien.component.css'
})
export class DashboardMecanicienComponent {
  router=inject(Router);
  authService=inject(AuthService);
  brand=environment.BRAND;
  nomUtilisateur;
  menuItems=signal([
    {
      lien:"/mecanicien/rdvs/liste",
      icon:"fa fa-car-alt me-2",
      active:"active",
      label:"Voitures",
    }
  ]);
  activeMenuIndex=signal(0);
  constructor() {
    const utilisateur=localStorage.getItem('utilisateur');
    this.nomUtilisateur = utilisateur===null?"Visiteur":JSON.parse(utilisateur).nom_utilisateur;
  }
  navigateMenu(index:number){
    const newMenu=this.menuItems();
    newMenu[this.activeMenuIndex()].active="";
    newMenu[index].active="active";
    this.menuItems.set(newMenu);
    this.activeMenuIndex.set(index);
  }
  async logout(){
    await this.authService.deconnexion(this.router);
  }
}
