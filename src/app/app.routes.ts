import { Routes } from '@angular/router';
import {isAuthClient, isAuthMecanicien, logout} from './features/connect.guard';
import {AppComponent} from './app.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { VoituresComponent } from './dashboard-client/voitures/voitures.component';
import { ProfilClientComponent } from './dashboard-client/profil-client/profil-client.component';
import { DetailsVoitureComponent } from './dashboard-client/details-voiture/details-voiture.component';
import { inject } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import { DemandeRdvComponent } from './dashboard-client/demande-rdv/demande-rdv.component';
import { ListeDemandeRdvComponent } from './dashboard-client/liste-demande-rdv/liste-demande-rdv.component';
import { DetailDemandeRdvComponent } from './dashboard-client/detail-demande-rdv/detail-demande-rdv.component';
import { DashboardMecanicienComponent } from './dashboard-mecanicien/dashboard-mecanicien.component';
import { LoginMecanicienComponent } from './core/auth/pages/login-mecanicien/login-mecanicien.component';
import { ListeDemandeRdvMecanicienComponent } from './dashboard-mecanicien/liste-demande-rdv/liste-demande-rdv.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Connexion - Client',
    // loadChildren: () => import('./core/auth/auth.routes').then(r => r.authRoutes)
    component: LoginComponent
  },
  {
    path: "",
    redirectTo:()=>{
      const cookie=inject(CookieService);
      if(cookie.get("cookieKey")==null){
        return "login";
      }
      return "client/voitures";
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
    children:[
      {
        path:"",
        redirectTo:()=>{
          const cookie=inject(CookieService);
          if(cookie.get("cookieKey")==null){
            return "../login"
          }
          return "voitures"
        },
        pathMatch:"full"
      },
      {
        path:"voitures",
        component: VoituresComponent
      },
      {
        path:"details-voiture/:id",
        component: DetailsVoitureComponent
      },
      {
        path:"demande-rdv/:idvoiture",
        component: DemandeRdvComponent
      },
      {
        path:"demande-rdv",
        component: ListeDemandeRdvComponent
      },
      {
        path:"details-demande-rdv/:iddemande",
        component: DetailDemandeRdvComponent
      },
      {
        path:"profil",
        component: ProfilClientComponent
      }
    ],
    canActivate:[isAuthClient]
    // loadChildren: () => import("./dashboard-client/client.routes").then(r => r.clientRoutes)
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
    children:[
      {
        path:"",
        redirectTo:()=>{
          const cookie=inject(CookieService);
          if(cookie.get("cookieKey")==null){
            return "../login"
          }
          return "demande-rdv"
        },
        pathMatch:"full"
      },
      {
        path:"demande-rdv",
        component:ListeDemandeRdvMecanicienComponent
      }
    ],
    canActivate:[isAuthMecanicien]
  },
  {
    path: 'chatting',
    loadChildren: () => import('./features/chatting/chatting.routes').then(r => r.chattingRoutes)
  },
];
