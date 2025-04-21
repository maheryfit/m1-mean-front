import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import {RevenuService} from './services/revenu.service';
import {FooterComponent} from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard-manager',
  imports: [RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './dashboard-manager.component.html',
  styleUrl: './dashboard-manager.component.css'
})
export class DashboardManagerComponent {
    loginService=inject(AuthService);
    router=inject(Router);
    nomUtilisateur=localStorage.getItem("nom_utilisateur");

    navigations = [
        {
            url: "/manager",
            icon: "bi bi-graph-down me-2",
            title: "Revenues"
        },
        {
            url: "/manager/service",
            icon: "bi-view-stacked me-2",
            title: "Service"
        },
        {
            url: "/manager/roleMecanicien",
            icon: "bi bi-person-badge me-2",
            title: "Rôle mécanicien"
        },
        {
            url: "/manager/niveauMecanicien",
            icon: "bi bi-person-badge me-2",
            title: "Niveau"
        },
        {
            url: "/manager/mecanicien",
            icon: "bi bi-person-badge me-2",
            title: "Mécanicien"
        },
        {
            url: "/manager/article",
            icon: "bi bi-basket3-fill me-2",
            title: "Article"
        },
    ]

    logout(){
        this.router.navigate(["login-manager"]).then(() => {
                this.loginService.logout().subscribe();
            }
        );
    }

}
