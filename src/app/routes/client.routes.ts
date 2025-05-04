import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {RouteService} from '../services/utils/route.service';
import {VoituresComponent} from '../dashboard-client/voitures/liste/voitures.component';
import {CreerVoitureComponent} from '../dashboard-client/voitures/creer-voiture/creer-voiture.component';
import {ListeStationsComponent} from '../dashboard-client/stations/liste-stations/liste-stations.component';
import {CreerRdvComponent} from '../dashboard-client/rdv/creer-rdv/creer-rdv.component';
import {isAuthClient, isAuthMecanicien} from '../features/connect.guard';
import {ListeRdvComponent} from '../dashboard-client/rdv/liste-rdv/liste-rdv.component';
import {environment} from '../../environments/environment';
import {DetailsRdvComponent} from '../dashboard-client/rdv/details-rdv/details-rdv.component';
import {ProfilComponent} from '../dashboard-client/profil/profil.component';

export const clientRoutes:Routes=[
  {
    path: "",
    redirectTo:()=>{
      const routeService=inject(RouteService);
      return routeService.filtrePathProfil(environment.PROFIL_CLIENT,"/client/voitures/liste/1");
    },
    pathMatch: "full"
  },
  {
    path:"voitures",
    title: "Gestion de voitures",
    children:[
      {
        path: "",
        redirectTo:()=>{
          const routeService=inject(RouteService);
          return routeService.filtrePathProfil(environment.PROFIL_CLIENT,"/client/voitures/liste/1");
        },
        pathMatch: "full"
      },
      {
        path:"liste/:page",
        component:VoituresComponent,
        canActivate:[isAuthClient]
      },
      {
        path:"creer/:page",
        component:CreerVoitureComponent,
        canActivate:[isAuthClient]
      }
    ]
  },
  {
    path:"stations",
    title:"Aperçu des stations",
    children:[
      {
        path:"",
        redirectTo:()=>{
          const routeService=inject(RouteService);
          return routeService.filtrePathProfil(environment.PROFIL_CLIENT,"/client/stations/liste/1");
        },
        pathMatch: "full"
      },
      {
        path:"liste/:page",
        component: ListeStationsComponent,
        canActivate:[isAuthClient]
      }
    ]
  },
  {
    path:"rdvs",
    title:"Rdv - Client",
    children:[
      {
        path:"",
        redirectTo:()=>{
          const routeService=inject(RouteService);
          return routeService.filtrePathProfil(environment.PROFIL_CLIENT,"/client/rdvs/liste/1");
        },
        pathMatch: "full"
      },
      {
        path:"creer/:pageStation/:idstation",
        component:CreerRdvComponent,
        canActivate:[isAuthClient]
      },
      {
        path:"liste/:page",
        component:ListeRdvComponent,
        canActivate:[isAuthClient]
      },
      {
        path:"details/:page/:idrdv",
        component:DetailsRdvComponent,
        canActivate:[isAuthClient]
      }
    ]
  },
  {
    path:"profil",
    title:"Profil - Client",
    component:ProfilComponent
  }
];
