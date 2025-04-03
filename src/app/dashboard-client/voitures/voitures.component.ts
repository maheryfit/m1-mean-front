import { NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { VoituresService } from '../../services/voitures.service';
import { User } from '../../core/auth/auth.model';
import { Voiture } from '../../models/voiture.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-voitures',
  imports: [RouterLink],
  templateUrl: './voitures.component.html',
  styleUrl: './voitures.component.css'
})
export class VoituresComponent {
  countVoitures=signal(0);
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
        this.voitures.set(data);
      });
    });
    effect(()=>{
      this.voitureService.count().subscribe((data)=>{
        this.countVoitures.set(data);
      })
    })
  }
  changePage(index:number){
    if(index<=0){
      return;
    }
    if(this.countVoitures()-((index-1)*this.pageLimit)<=0){
      return;
    }
    this.currentIndex.set(index);
  }
}
