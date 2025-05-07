import { Component, inject, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {AuthManagerService} from '../../services/auth-manager.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-manager.component.html',
  styleUrl: './login-manager.component.css'
})
export class LoginManagerComponent {
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
  loginService=inject(AuthManagerService);
  loginForm=new FormGroup({
    nomUtilisateur: new FormControl('Fitahiana Mahery', Validators.required),
    motDePasse: new FormControl('Fitahiana Mahery', Validators.required)
  });
  erreur=signal('');
  router=inject(Router);
  /*login(){
    const nomUtilisateur:string=this.loginForm.value.nomUtilisateur?this.loginForm.value.nomUtilisateur:'';
    const motDePasse:string=this.loginForm.value.motDePasse?this.loginForm.value.motDePasse:'';
    const user:Auth={
      nom_utilisateur:nomUtilisateur,
      mot_de_passe:motDePasse
    };
    this.loginService.login(user).subscribe({
      next:(res) => {
        this.loginService.storeUserToLocalStorage(res.body as User);
        this.router.navigate(["manager"]);
      },
      error: (error)=>{
        this.erreur.set(error.error.message);
      }
    });
  }*/

  login(){
    const utilisateurToSend={
      nomUtilisateur:this.loginForm.value.nomUtilisateur,
      motDePasse:this.loginForm.value.motDePasse,
      profil: environment.PROFIL_MANAGER
    }
    this.loginService.connexion(this.router,utilisateurToSend,this.erreur);
  }
}
