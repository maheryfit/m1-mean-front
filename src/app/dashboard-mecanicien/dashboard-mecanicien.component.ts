import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-mecanicien',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-mecanicien.component.html',
  styleUrl: './dashboard-mecanicien.component.css'
})
export class DashboardMecanicienComponent {
  loginService=inject(AuthService);
  router=inject(Router);
  nomUtilisateur=localStorage.getItem("nom_utilisateur");
  logout(){
    this.loginService.logout().subscribe();
    this.router.navigate(["login-mecanicien"]);
  }
}
