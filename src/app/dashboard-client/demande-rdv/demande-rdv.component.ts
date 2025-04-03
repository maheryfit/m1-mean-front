import { Component, computed, effect, inject, signal } from '@angular/core';
import { StationService } from '../../services/station.service';
import { Station } from '../../models/station.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Voiture } from '../../models/voiture.model';
import { VoituresService } from '../../services/voitures.service';
import { StationComponent } from './station/station.component';

@Component({
  selector: 'app-demande-rdv',
  imports: [StationComponent],
  templateUrl: './demande-rdv.component.html',
  styleUrl: './demande-rdv.component.css'
})
export class DemandeRdvComponent {
  route=inject(ActivatedRoute);
  router=inject(Router);
  idvoiture=this.route.snapshot.paramMap.get("idvoiture");
  countStation=signal(0);
  previousIndex=computed(()=>this.currentIndex()-1);
  currentIndex=signal(1);
  nextIndex=computed(()=>this.currentIndex()+1);
  pageLimit=5;
  stationService=inject(StationService);
  voitureService=inject(VoituresService);
  stations=signal<Station[]>([]);
  voiture=signal<Voiture|null>(null);
  constructor(){
    effect(()=>{
      this.stationService.getStations(this.currentIndex(), this.pageLimit).subscribe({
        next: (data)=>{
          this.stations.set(data);
        },
        error: ()=>{
          this.router.navigate([`../details-voiture/${this.idvoiture}`]);
        }
      })
    });
    effect(()=>{
      this.stationService.count().subscribe({
        next: (data)=>{
          this.countStation.set(data);
        },
        error: ()=>{
          this.router.navigate([`../details-voiture/${this.idvoiture}`])
        }
      })
    });
    effect(()=>{
      this.voitureService.getVoiture(this.idvoiture).subscribe({
        next: (data)=>{
          this.voiture.set(data);
        },
        error: ()=>{
          this.router.navigate([`../details-voiture/${this.idvoiture}`])
        }
      })
    })
  }
  changePage(index:number){
    if(index<=0){
      return;
    }
    if(this.countStation()-((index-1)*this.pageLimit)<=0){
      return;
    }
    this.currentIndex.set(index);
  }
}
