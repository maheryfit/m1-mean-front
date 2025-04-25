import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {RouteService} from '../services/utils/route.service';
import {VoituresComponent} from '../dashboard-client/voitures/liste/voitures.component';
import {CreerVoitureComponent} from '../dashboard-client/voitures/creer-voiture/creer-voiture.component';
import {ListeStationsComponent} from '../dashboard-client/stations/liste-stations/liste-stations.component';
import {CreerRdvComponent} from '../dashboard-client/rdv/creer-rdv/creer-rdv.component';
import {DetailsVoitureComponent} from '../dashboard-client/details-voiture/details-voiture.component';
import {DemandeRdvComponent} from '../dashboard-client/demande-rdv/demande-rdv.component';
import {ListeDemandeRdvComponent} from '../dashboard-client/liste-demande-rdv/liste-demande-rdv.component';
import {DetailDemandeRdvComponent} from '../dashboard-client/detail-demande-rdv/detail-demande-rdv.component';
import {ProfilClientComponent} from '../dashboard-client/profil-client/profil-client.component';
import {isAuthClient} from '../features/connect.guard';

export const clientRoutes:Routes=[
  {
    path: "",
    redirectTo:()=>{
      const routeService=inject(RouteService);
      return routeService.filtrePathClientVoiture();
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
          return routeService.filtrePathClientVoiture();
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
          return routeService.filtrePathClientStation();
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
    path:"rdv",
    title:"Rdv - Client",
    children:[
      {
        path:"",
        redirectTo:()=>{
          const routeService=inject(RouteService);
          return routeService.filtrePathClientStation();
        },
        pathMatch: "full"
      },
      {
        path:"creer/:pageStation/:idstation",
        component:CreerRdvComponent,
        canActivate:[isAuthClient]
      }
    ]
  },
  {
    path:"details-voiture/:id",
    component: DetailsVoitureComponent,
    canActivate:[isAuthClient]
  },
  {
    path:"demande-rdv/:idvoiture",
    component: DemandeRdvComponent,
    canActivate:[isAuthClient]
  },
  {
    path:"demande-rdv",
    component: ListeDemandeRdvComponent,
    canActivate:[isAuthClient]
  },
  {
    path:"details-demande-rdv/:iddemande",
    component: DetailDemandeRdvComponent,
    canActivate:[isAuthClient]
  },
  {
    path:"profil",
    component: ProfilClientComponent,
    canActivate:[isAuthClient]
  }
];
