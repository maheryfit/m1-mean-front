import { Routes } from '@angular/router';
import {logout} from './features/connect.guard';
import {AppComponent} from './app.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { LoginComponent } from './core/auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    // loadChildren: () => import('./core/auth/auth.routes').then(r => r.authRoutes)
    component: LoginComponent
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
    path: "",
    // redirectTo:"login",
    // pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "client",
    component: DashboardClientComponent,
    loadChildren: () => import("./dashboard-client/client.routes").then(r => r.clientRoutes)
  }
];
