import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {RouteService} from '../services/utils/route.service';
import {environment} from '../../environments/environment';
import {ListeRdvComponent} from '../dashboard-mecanicien/rdv/liste-rdv/liste-rdv.component';
import {isAuthMecanicien} from '../features/connect.guard';
import {DetailsRdvComponent} from '../dashboard-mecanicien/rdv/details-rdv/details-rdv.component';

export const mecanicienRoutes: Routes = [
  {
    path: "",
    redirectTo:()=>{
      const routeService=inject(RouteService);
      return routeService.filtrePathProfil(environment.PROFIL_MECANICIEN,"/mecanicien/rdvs");
    },
    pathMatch: "full"
  },
  {
    path: "rdvs",
    title: "Liste des rendez-vous",
    children:[
      {
        path:"",
        redirectTo:()=>{
          const routeService=inject(RouteService);
          return routeService.filtrePathProfil(environment.PROFIL_MECANICIEN,"/mecanicien/rdvs/liste/1");
        },
        pathMatch: "full"
      },
      {
        path:"liste/:page",
        component:ListeRdvComponent,
        canActivate:[isAuthMecanicien]
      },
      {
        path:"details/:page/:idrdv",
        component:DetailsRdvComponent,
        canActivate:[isAuthMecanicien]
      }
    ]
  }
]
