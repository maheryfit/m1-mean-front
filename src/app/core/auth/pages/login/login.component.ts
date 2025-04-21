import { Component, inject, Renderer2, signal } from '@angular/core';
import {Auth, MyHttpError, User} from '../../auth.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import { environment } from '../../../../../environments/environment';
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
    nomUtilisateur: new FormControl('JBo', Validators.required),
    motDePasse: new FormControl('root', Validators.required)
  });
  erreur=signal('');
  router=inject(Router);
  login(){
    const utilisateurToSend={
      nomUtilisateur:this.loginForm.value.nomUtilisateur,
      motDePasse:this.loginForm.value.motDePasse,
      profil:environment.PROFIL_CLIENT
    }
    this.loginService.connexion(this.router,utilisateurToSend,this.erreur);
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
