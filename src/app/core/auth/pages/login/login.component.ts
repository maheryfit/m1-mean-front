import { Component, inject, Renderer2, signal } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { environment } from '../../../../../environments/environment';
import {ClientService} from '../../../../services/client.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  clientService=inject(ClientService);
  loginForm=new FormGroup({
    nomUtilisateur: new FormControl('JBo', Validators.required),
    motDePasse: new FormControl('root', Validators.required)
  });
  erreur=signal('');
  router=inject(Router);
  constructor() {
    sessionStorage.removeItem("menuIndex");
  }
  login(){
    const utilisateurToSend={
      nomUtilisateur:this.loginForm.value.nomUtilisateur,
      motDePasse:this.loginForm.value.motDePasse,
      profil:environment.PROFIL_CLIENT
    }
    this.clientService.connexion(this.router,utilisateurToSend,this.erreur);
  }
}
