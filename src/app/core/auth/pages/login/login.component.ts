import { Component } from '@angular/core';
import {Auth, User} from '../../auth.model';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

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
  title = 'Login';
  userLogin: Auth = {nom_utilisateur: '', mot_de_passe: ''};

  constructor(private authService: AuthService, private router: Router ) {
  }

  login() {
    console.log(this.userLogin);
    this.authService.login(this.userLogin).subscribe( {
      next: async (data: any) => {
        console.log(data);
        this.authService.storeUserToLocalStorage(data as User)
        await this.router.navigate(['/chatting']);
      },
      error: (e: any) => {
        console.error(e);
      }
    })
  }
}
