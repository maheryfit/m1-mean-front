import { Routes } from '@angular/router';
import {logout} from './features/connect.guard';
import {AppComponent} from './app.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./core/auth/auth.routes').then(r => r.authRoutes)
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
    redirectTo:"login",
    pathMatch: "full",
  },
  {
    path: "client",
    component: DashboardClientComponent,
    loadChildren: () => import("./dashboard-client/client.routes").then(r => r.clientRoutes)
  }
];
