import { Routes } from '@angular/router';
import {logout} from './features/connect.guard';
import {AppComponent} from './app.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { VoituresComponent } from './dashboard-client/voitures/voitures.component';
import { ProfilClientComponent } from './dashboard-client/profil-client/profil-client.component';
import { DetailsVoitureComponent } from './dashboard-client/details-voiture/details-voiture.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Connexion',
    // loadChildren: () => import('./core/auth/auth.routes').then(r => r.authRoutes)
    component: LoginComponent
  },
  {
    path: "",
    // redirectTo:"login",
    // pathMatch: "full",,
    title: "Connexion",
    component: LoginComponent
  },
  {
    path: "sign-up",
    title: "Inscription",
    component: SignupComponent
  },
  {
    path: 'logout',
    component: LoginComponent,
    // canActivate: [logout]
  },
  {
    path: "client",
    component: DashboardClientComponent,
    children:[
      {
        path:"voitures",
        component: VoituresComponent
      },
      {
        path:"details-voiture/:id",
        component: DetailsVoitureComponent
      },
      {
        path:"profil",
        component: ProfilClientComponent
      }
    ]
    // loadChildren: () => import("./dashboard-client/client.routes").then(r => r.clientRoutes)
  },
  {
    path: 'chatting',
    loadChildren: () => import('./features/chatting/chatting.routes').then(r => r.chattingRoutes)
  },
];
