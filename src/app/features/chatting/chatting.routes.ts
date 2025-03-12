import {Routes} from '@angular/router';
import {ChattingComponent} from './pages/chatting/chatting.component';
import {isAuthConnected, isAuthMecanicien, isAuthManager} from '../connect.guard';

export const chattingRoutes: Routes = [
  {
    path: '',
    component: ChattingComponent,
    canActivate: [isAuthManager],
  }
]
