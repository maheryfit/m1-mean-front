import { Component, inject, Renderer2, signal } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { environment } from '../../../../../environments/environment';
import {MecanicienService} from '../../../../services/mecanicien.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-mecanicien.component.html',
  styleUrl: './login-mecanicien.component.css'
})
export class LoginMecanicienComponent {
  mecanicienService=inject(MecanicienService);
  loginForm=new FormGroup({
    nomUtilisateur: new FormControl('Marc', Validators.required),
    motDePasse: new FormControl('root', Validators.required)
  });
  erreur=signal('');
  router=inject(Router);
  login(){
    const utilisateurToSend={
      nomUtilisateur:this.loginForm.value.nomUtilisateur,
      motDePasse:this.loginForm.value.motDePasse,
      profil:environment.PROFIL_MECANICIEN
    }
    this.mecanicienService.connexion(this.router,utilisateurToSend,this.erreur);
  }
}
