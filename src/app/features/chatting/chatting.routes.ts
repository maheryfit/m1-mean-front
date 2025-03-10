import {Routes} from '@angular/router';
import {ChattingComponent} from './pages/chatting/chatting.component';
import {connectGuard} from '../connect.guard';

export const chattingRoutes: Routes = [
  {
    path: '',
    component: ChattingComponent,
    canActivate: [connectGuard],
  }
]
