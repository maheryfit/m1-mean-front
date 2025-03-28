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

}
