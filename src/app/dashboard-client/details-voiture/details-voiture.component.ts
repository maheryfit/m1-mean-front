import { Component, effect, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voiture } from '../../models/voiture.model';
import { VoituresService } from '../voitures/voitures.service';

@Component({
  selector: 'app-details-voiture',
  imports: [],
  templateUrl: './details-voiture.component.html',
  styleUrl: './details-voiture.component.css'
})
export class DetailsVoitureComponent {
  route=inject(ActivatedRoute);
  router=inject(Router);
  idvoiture:string|null=this.route.snapshot.paramMap.get("id");
  voitureService=inject(VoituresService);
  voiture:Voiture|null=null;
  constructor(){
    this.voitureService.getVoiture(this.idvoiture).subscribe({
      next: (data)=>{
        this.voiture=data;
      },
      error: ()=>{
        this.router.navigate([""])
      }
    })
  }
}
