import {Component, inject, OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import {RevenuService} from '../services/revenu.service';

@Component({
  selector: 'app-dashboard-manager',
  imports: [RouterOutlet],
  templateUrl: './dashboard-manager.component.html',
  styleUrl: './dashboard-manager.component.css'
})
export class DashboardManagerComponent {
    loginService=inject(AuthService);
    router=inject(Router);
    nomUtilisateur=localStorage.getItem("nom_utilisateur");


    logout(){
        this.loginService.logout().subscribe();
        this.router.navigate(["login-manager"]);
    }

}
