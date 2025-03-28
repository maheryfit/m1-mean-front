import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { VoitureComponent } from "./voiture/voiture.component";

@Component({
  selector: 'app-voitures',
  imports: [VoitureComponent],
  templateUrl: './voitures.component.html',
  styleUrl: './voitures.component.css'
})
export class VoituresComponent {
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
