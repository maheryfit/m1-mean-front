import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, User } from '../../auth.model';

@Component({
  selector: 'app-login-mecanicien',
  imports: [ReactiveFormsModule],
  templateUrl: './login-mecanicien.component.html',
  styleUrl: './login-mecanicien.component.css'
})
export class LoginMecanicienComponent {
  loginService=inject(AuthService);
  loginForm=new FormGroup({
    nomUtilisateur: new FormControl('claire.petit', Validators.required),
    motDePasse: new FormControl('claire.petit', Validators.required)
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
      this.router.navigate(["mecanicien"]);
    });
  }
}
