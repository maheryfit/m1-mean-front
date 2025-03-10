import { Component } from '@angular/core';
import {Auth} from '../../auth.model';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../auth.service';

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
  userLogin: Auth = {username: '', password: ''};

  constructor(private authService: AuthService) {
  }

  login() {
    console.log(this.userLogin);
    this.authService.login(this.userLogin).subscribe((data) => {
      console.log(data);
    })
  }
}
