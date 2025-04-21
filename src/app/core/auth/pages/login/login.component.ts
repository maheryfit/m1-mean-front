import { Component, inject, Renderer2, signal } from '@angular/core';
import {Auth, MyHttpError, User} from '../../auth.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
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
  loginService=inject(AuthService);
  loginForm=new FormGroup({
    nomUtilisateur: new FormControl('jdupont', Validators.required),
    motDePasse: new FormControl('jdupont', Validators.required)
  });
  erreur=signal('');
  router=inject(Router);
  login(){
    const nomUtilisateur=this.loginForm.value.nomUtilisateur;
    const motDePasse=this.loginForm.value.motDePasse;
    const user={
      nom_utilisateur:nomUtilisateur,
      mot_de_passe:motDePasse
    };
    // this.loginService.login(user).subscribe({
    //   next:(res) => {
    //     this.loginService.storeUserToLocalStorage(res.body as User);
    //     this.router.navigate(["client"]);
    //   },
    //   error: (error)=>{
    //     this.erreur.set(error.error.message);
    //   }
    // });
  }
}
