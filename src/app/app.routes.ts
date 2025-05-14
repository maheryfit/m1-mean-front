import { Routes } from '@angular/router';
import { DashboardClientComponent } from './pages/dashboard-client/dashboard-client.component';
import { LoginComponent } from './pages/core/auth/pages/login/login.component';
import { SignupComponent } from './pages/core/auth/pages/signup/signup.component';
import { inject } from '@angular/core';
import { DashboardMecanicienComponent } from './pages/dashboard-mecanicien/dashboard-mecanicien.component';
import { LoginMecanicienComponent } from './pages/core/auth/pages/login-mecanicien/login-mecanicien.component';
import {RouteService} from './services/utils/route.service';
import {clientRoutes} from './routes/client.routes';
import {mecanicienRoutes} from './routes/mecanicien.routes';

import {LoginManagerComponent} from './core/auth/pages/login-manager/login-manager.component';

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
  // Login manager
  {
    path:"login-manager",
    component:LoginManagerComponent,
    title:"Connexion - Manager"
  },
  {
    path:"manager",
    loadChildren: () => import("./features/dashboard-manager/dashboard-manager.routes").then(r => r.dashboardManagerRoutes)
  },
  {
    path: 'chatting',
    loadChildren: () => import('./features/chatting/chatting.routes').then(r => r.chattingRoutes)
  },
];
