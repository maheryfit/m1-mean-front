import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-voiture',
  imports: [],
  templateUrl: './details-voiture.component.html',
  styleUrl: './details-voiture.component.css'
})
export class DetailsVoitureComponent {
  private readonly route=inject(ActivatedRoute);
  idvoiture=this.route.snapshot.paramMap.get('id');
  voitures=[
    {
      id:"1",
      description:"Ma voiture 1",
      immatriculation:"1111 TAV",
      modele:"Toyota Corolla",
      type:"SUV",
      moteur:"diesel",
      transmission:"manuelle",
      traction:"avant"
    },
    {
      id:"2",
      description:"Ma voiture 2",
      immatriculation:"1111 TAV",
      modele:"Toyota Corolla",
      type:"SUV",
      moteur:"diesel",
      transmission:"manuelle",
      traction:"avant"
    },
    {
      id:"3",
      description:"Ma voiture 3",
      immatriculation:"1111 TAV",
      modele:"Toyota Corolla",
      type:"SUV",
      moteur:"diesel",
      transmission:"manuelle",
      traction:"avant"
    },
    {
      id:"4",
      description:"Ma voiture 4",
      immatriculation:"1111 TAV",
      modele:"Toyota Corolla",
      type:"SUV",
      moteur:"diesel",
      transmission:"manuelle",
      traction:"avant"
    },
    {
      id:"5",
      description:"Ma voiture 5",
      immatriculation:"1111 TAV",
      modele:"Toyota Corolla",
      type:"SUV",
      moteur:"diesel",
      transmission:"manuelle",
      traction:"avant"
    },
    {
      id:"6",
      description:"Ma voiture 6",
      immatriculation:"1111 TAV",
      modele:"Toyota Corolla",
      type:"SUV",
      moteur:"diesel",
      transmission:"manuelle",
      traction:"avant"
    },
    {
      id:"7",
      description:"Ma voiture 7",
      immatriculation:"1111 TAV",
      modele:"Toyota Corolla",
      type:"SUV",
      moteur:"diesel",
      transmission:"manuelle",
      traction:"avant"
    },
  ]
}
