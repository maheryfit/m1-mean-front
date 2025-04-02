import { NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { VoituresService } from './voitures.service';
import { User } from '../../core/auth/auth.model';
import { Voiture } from '../../models/voiture.model';

@Component({
  selector: 'app-voitures',
  imports: [],
  templateUrl: './voitures.component.html',
  styleUrl: './voitures.component.css'
})
export class VoituresComponent {
  previousIndex=computed(()=>this.currentIndex()-1);
  currentIndex=signal(1);
  nextIndex=computed(()=>this.currentIndex()+1);
  pageLimit=10;
  voitureService=inject(VoituresService);
  voitures=signal<Voiture[]>([]);
  constructor(){
    effect(()=>{
      this.voitureService.getAllVoitures(this.currentIndex(), this.pageLimit)
      .subscribe((data)=>{
        console.log(data);
        this.voitures.set(data);
      })
    });
  }
  changePage(index:number){
    if(index<=0){
      return;
    }
    this.currentIndex.set(index);
  }
}
