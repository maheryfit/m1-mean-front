import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Voiture } from '../../models/voiture.model';
import { VoituresService } from '../../services/voitures.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecificationService } from '../../services/specification.service';
import { Specification } from '../../models/specification.model';
import { ObjectModel } from '../../object-model.model';
import { VoitureBase } from '../../models/voiture-base.model';

@Component({
  selector: 'app-details-voiture',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './details-voiture.component.html',
  styleUrl: './details-voiture.component.css'
})
export class DetailsVoitureComponent {
  route=inject(ActivatedRoute);
  router=inject(Router);
  idvoiture:string|null=this.route.snapshot.paramMap.get("id");
  voitureService=inject(VoituresService);
  specService=inject(SpecificationService);
  voiture=signal<Voiture|null>(null);
  specs=signal<Specification|null>(null);
  erreur=signal('');
  modifForm=new FormGroup({
    description:new FormControl('', Validators.required),
    immatriculation:new FormControl('', Validators.required),
    modele:new FormControl('', Validators.required),
    type:new FormControl('', Validators.required),
    moteur:new FormControl('', Validators.required),
    transmission:new FormControl('', Validators.required),
    traction:new FormControl('', Validators.required)
  });
  constructor(){
    this.voitureService.getVoiture(this.idvoiture).subscribe({
      next: (data)=>{
        this.voiture.set(data);
        this.specs.set(data.specification);
        this.modifForm.patchValue({
          description:data.description,
          immatriculation:data.immatriculation,
          modele:data.specification.modele,
          type:data.specification.type,
          moteur:data.specification.moteur,
          transmission:data.specification.transmission,
          traction:data.specification.traction
        });
      },
      error: ()=>{
        this.router.navigate([""])
      }
    })
  }
  modifier(){
    let modifs:VoitureBase={
      _id:this.voiture()?._id as string,
      proprietaire:this.voiture()?.proprietaire as string,
      description:this.voiture()?.description as string,
      immatriculation:this.voiture()?.immatriculation as string,
      specification:this.voiture()?.specification._id as string,
      images_name:this.voiture()?.images_name as string[],
      __v:this.voiture()?.__v as string,
      createdAt:this.voiture()?.createdAt as Date,
      updatedAt:this.voiture()?.updatedAt as Date
    };
    let modifSpec:Specification=this.specs() as Specification;
    modifs.description=this.modifForm.value.description as string;
    modifs.immatriculation=this.modifForm.value.immatriculation as string;
    modifSpec.modele=this.modifForm.value.modele as string;
    modifSpec.type=this.modifForm.value.type as string;
    modifSpec.moteur=this.modifForm.value.moteur as string;
    modifSpec.transmission=this.modifForm.value.transmission as string;
    modifSpec.traction=this.modifForm.value.traction as string;
    this.specService.modifierSpec(modifSpec._id, modifSpec).subscribe({
      next: (spec)=>{
        this.specs.set(spec);
        this.voitureService.modifierVoiture(this.idvoiture, modifs).subscribe({
          next: (voiture)=>{
            this.voiture.set(voiture);
          },
          error: (error:Error)=>{
            this.erreur.set(error.message);
          }
        });
      },
      error: (error:Error)=>{
        this.erreur.set(error.message);
      }
    })
  }
}
