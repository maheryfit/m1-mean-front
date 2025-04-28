import { Routes } from '@angular/router';
import {isAuthClient, isAuthMecanicien, logout} from './features/connect.guard';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { inject } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import { DashboardMecanicienComponent } from './dashboard-mecanicien/dashboard-mecanicien.component';
import { LoginMecanicienComponent } from './core/auth/pages/login-mecanicien/login-mecanicien.component';
import { ListeDemandeRdvMecanicienComponent } from './dashboard-mecanicien/liste-demande-rdv/liste-demande-rdv.component';
import { DetailDemandeRdvMecanicienComponent } from './dashboard-mecanicien/detail-demande-rdv/detail-demande-rdv.component';
import { CreerDevisComponent } from './dashboard-mecanicien/creer-devis/creer-devis.component';
import {RouteService} from './services/utils/route.service';
import {clientRoutes} from './routes/client.routes';
import {mecanicienRoutes} from './routes/mecanicien.routes';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Connexion - Client',
    component: LoginComponent
  },
  {
    path: "",
    redirectTo:()=>{
      const routeService=inject(RouteService);
      return routeService.filtrePathGeneral();
    },
    pathMatch: "full"
  },
  {
    path: "sign-up",
    title: "Inscription - Client",
    component: SignupComponent
  },
  {
    path: "client",
    component: DashboardClientComponent,
    title:"Tableau de bord - Client",
    children:clientRoutes
  },
  {
    path:"login-mecanicien",
    component:LoginMecanicienComponent,
    title:"Connexion - Mécanicien"
  },
  {
    path:"mecanicien",
    component:DashboardMecanicienComponent,
    title:"Tableau de bord - Mécanicien",
    children:mecanicienRoutes
      // [
      // {
      //   path:"",
      //   redirectTo:()=>{
      //     const cookie=inject(CookieService);
      //     if(cookie.get("cookieKey")==null){
      //       return "../login"
      //     }
      //     return "demande-rdv"
      //   },
      //   pathMatch:"full"
      // },
      // {
      //   path:"demande-rdv",
      //   component:ListeDemandeRdvMecanicienComponent
      // },
      // {
      //   path:"details-demande-rdv/:iddemande",
      //   component:DetailDemandeRdvMecanicienComponent
      // },
      // {
      //   path:"creer-devis/:iddemande",
      //   component:CreerDevisComponent
      // }
    // ],
    // canActivate:[isAuthMecanicien]
  },
  {
    path: 'chatting',
    loadChildren: () => import('./features/chatting/chatting.routes').then(r => r.chattingRoutes)
  },
];
