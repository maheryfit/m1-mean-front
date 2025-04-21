import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
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
  inscription(){
    const utilisateurToSend={
      nom:this.signupForm.value.nom,
      prenom:this.signupForm.value.prenom,
      nomUtilisateur:this.signupForm.value.nomUtilisateur,
      motDePasse:this.signupForm.value.motDePasse,
      telephone:this.signupForm.value.telephone
    }
    const erreur=this.erreur;
    const router=this.router;
    const url=environment.API_URL;
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
      if(this.readyState===4){
        switch(this.status){
          case 200:
            router.navigate(["login"]);
            break;
          case 500:
            erreur.set(JSON.parse(this.response).message);
            break;
        }
      }
    }
    xhr.open("POST", `${url}/client/inscription`, true);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.send(JSON.stringify(utilisateurToSend));
  }
}
