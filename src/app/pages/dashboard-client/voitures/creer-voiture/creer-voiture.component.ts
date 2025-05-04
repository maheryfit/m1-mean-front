import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Caracteristique} from '../../../../models/caracteristique.model';
import {ClasseVoiture} from '../../../../models/voiture.model';
import {ClientService} from '../../../../services/client.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-creer-voiture',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './creer-voiture.component.html',
  styleUrl: './creer-voiture.component.css'
})
export class CreerVoitureComponent {
  route=inject(ActivatedRoute);
  lastPageVisited=this.route.snapshot.params['page'];
  voitureForm=new FormGroup({
      description: new FormControl("Toyota Corolla", Validators.required),
      immatriculation: new FormControl("1111 TAB", Validators.required),
  });
  nomCaracteristique=new FormControl("Type", Validators.required);
  valeurCaracteristique=new FormControl("SUV", Validators.required);
  caracteristiques=signal<Caracteristique[]>([]);
  erreur=signal("");
  erreurCaracteristique=signal("");
  clientService=inject(ClientService);
  router=inject(Router);
  ajouterCaracteristique(){
    if(!this.nomCaracteristique.valid||!this.valeurCaracteristique.valid){
      this.erreurCaracteristique.set("Le libellé et la valeur de la caractéristique ne peuvent pas être vides.");
      return;
    }
    const caracteristique=new Caracteristique({});
    caracteristique.init({
      nom:this.nomCaracteristique.value,
      valeur:this.valeurCaracteristique.value
    });
    this.caracteristiques().push(caracteristique);
  }
  creerVoiture(){
    if(!this.voitureForm.valid){
      this.erreur.set("Veuillez remplir les champs.");
      return;
    }
    const voiture={
      description:this.voitureForm.value.description,
      immatriculation:this.voitureForm.value.immatriculation,
      caracteristiques:this.caracteristiques()
    }
    this.clientService.creerVoiture(voiture)
      .then(async (data)=>{
        await this.router.navigate(['client',"voitures","liste",this.lastPageVisited]);
      }).catch((error)=>{
        this.erreur.set(error);
    })
  }
}
