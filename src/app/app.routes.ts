import { Routes } from '@angular/router';
import {logout} from './features/connect.guard';
import {AppComponent} from './app.component';

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
  }
];
