import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ClientService} from '../../../../services/client.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  brand=environment.BRAND;
  router=inject(Router);
  signupForm=new FormGroup({
    nom:new FormControl("Jean",Validators.required),
    prenom:new FormControl("Beau",Validators.required),
    nomUtilisateur:new FormControl("JBo",Validators.required),
    motDePasse:new FormControl("root",Validators.required),
    telephone:new FormControl("XXX",Validators.required)
  });
  erreur=signal("");
  clientService=inject(ClientService );
  constructor() {
    sessionStorage.removeItem("menuIndex");
  }
  inscription(){
    const utilisateurToSend={
      nom:this.signupForm.value.nom,
      prenom:this.signupForm.value.prenom,
      nomUtilisateur:this.signupForm.value.nomUtilisateur,
      motDePasse:this.signupForm.value.motDePasse,
      telephone:this.signupForm.value.telephone
    }
    this.clientService.inscription(this.router,utilisateurToSend,this.erreur);
  }
}
