import { Component, Renderer2 } from '@angular/core';
import {Auth, User} from '../../auth.model';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ChattingService} from '../../../../features/chatting/chatting.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private chattingService: ChattingService) {
  }
  title = 'Login';
  userLogin: Auth = {nom_utilisateur: '', mot_de_passe: ''};
  footer= environment.FOOTER;

  login() {
    this.authService.login(this.userLogin).subscribe( {
      next: async (data: any) => {
        this.authService.storeUserToLocalStorage(data as User)
        this.chattingService.emitOnline()
        // await this.router.navigate(['/chatting']);
        await this.authService.filtreRedirection(data as User);
      },
      error: (e: any) => {
        console.error(e);
      }
    })
  }
}
