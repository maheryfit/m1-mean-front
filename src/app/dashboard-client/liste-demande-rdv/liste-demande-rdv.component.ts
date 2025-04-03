import { Component, computed, effect, inject, signal } from '@angular/core';
import { DemandeRdvService } from '../../services/demande-rdv.service';
import { DemandeRdv, DemandeRdvDetails } from '../../models/demande-rdv.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-demande-rdv',
  imports: [RouterLink],
  templateUrl: './liste-demande-rdv.component.html',
  styleUrl: './liste-demande-rdv.component.css'
})
export class ListeDemandeRdvComponent {
  count=signal(0);
  previousIndex=computed(()=>this.currentIndex()-1);
  currentIndex=signal(1);
  nextIndex=computed(()=>this.currentIndex()+1);
  pageLimit=10;
  demandeService=inject(DemandeRdvService);
  demandes=signal<DemandeRdvDetails[]>([]);
  constructor(){
    effect(()=>{
      this.demandeService.getAll(this.currentIndex(), this.pageLimit).subscribe({
        next: (data)=>{
          this.demandes.set(data);
        },
        error: (error)=>{
          alert(error.error.message)
        }
      })
    })
    effect(()=>{
      this.demandeService.count().subscribe({
        next: (data)=>{
          this.count.set(data);
        },
        error: (error)=>{
          alert(error)
        }
      })
    })
  }
  changePage(index:number){
    if(index<=0){
      return;
    }
    if(this.count()-((index-1)*this.pageLimit)<=0){
      return;
    }
    this.currentIndex.set(index);
  }
}
