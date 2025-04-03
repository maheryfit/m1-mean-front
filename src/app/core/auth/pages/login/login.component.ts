import { Component, inject, Renderer2, signal } from '@angular/core';
import {Auth, MyHttpError, User} from '../../auth.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {ChattingService} from '../../../../features/chatting/chatting.service';
import { environment } from '../../../../../environments/environment.development';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // constructor(private authService: AuthService, private router: Router, private chattingService: ChattingService) {
  // }
  // title = 'Login';
  // userLogin: Auth = {nom_utilisateur: '', mot_de_passe: ''};
  // footer= environment.FOOTER;
  // brand=environment.BRAND

  // login() {
  //   this.authService.login(this.userLogin).subscribe( {
  //     next: async (data: any) => {
  //       this.authService.storeUserToLocalStorage(data as User)
  //       this.chattingService.emitOnline()
  //       // await this.router.navigate(['/chatting']);
  //       await this.authService.filtreRedirection(data as User);
  //     },
  //     error: (e: any) => {
  //       console.error(e);
  //     }
  //   })
  // }
  loginService=inject(AuthService);
  loginForm=new FormGroup({
    nomUtilisateur: new FormControl('jdupont', Validators.required),
    motDePasse: new FormControl('jdupont', Validators.required)
  });
  error=signal('');
  router=inject(Router);
  login(){
    const nomUtilisateur:string=this.loginForm.value.nomUtilisateur?this.loginForm.value.nomUtilisateur:'';
    const motDePasse:string=this.loginForm.value.motDePasse?this.loginForm.value.motDePasse:'';
    const user:Auth={
      nom_utilisateur:nomUtilisateur,
      mot_de_passe:motDePasse
    };
    this.loginService.login(user).subscribe(res => {
      this.loginService.storeUserToLocalStorage(res.body as User);
      this.router.navigate(["client"]);
    });
  }
}
