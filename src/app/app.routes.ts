import { Routes } from '@angular/router';
import {logout} from './features/connect.guard';
import {AppComponent} from './app.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';

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
    path: 'chatting',
    loadChildren: () => import('./features/chatting/chatting.routes').then(r => r.chattingRoutes)
  },
  {
    path: 'logout',
    component: AppComponent,
    canActivate: [logout]
  },
  {
    path: "client",
    component: DashboardClientComponent,
    loadChildren: () => import("./dashboard-client/client.routes").then(r => r.clientRoutes)
  }
];
