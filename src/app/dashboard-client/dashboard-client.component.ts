import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-client',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent {
  loginService=inject(AuthService);
  router=inject(Router);
  brand=environment.BRAND;
  nomUtilisateur=localStorage.getItem("nom_utilisateur");
  logout(){
    this.loginService.logout().subscribe();
    this.router.navigate(["login"]);
  }
}
