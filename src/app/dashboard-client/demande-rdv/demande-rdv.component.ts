import { Component, computed, effect, inject, signal } from '@angular/core';
import { StationService } from '../../services/station.service';
import { Station } from '../../models/station.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Voiture } from '../../models/voiture.model';
import { VoituresService } from '../../services/voitures.service';
import { StationComponent } from './station/station.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemandeRdv } from '../../models/demande-rdv.model';
import { DemandeRdvService } from '../../services/demande-rdv.service';

@Component({
  selector: 'app-demande-rdv',
  imports: [StationComponent, ReactiveFormsModule, RouterLink],
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
  demandeService=inject(DemandeRdvService);
  stations=signal<Station[]>([]);
  voiture=signal<Voiture|null>(null);
  erreur=signal('');
  rdvform=new FormGroup({
    station:new FormControl('', Validators.required),
    voiture:new FormControl(this.idvoiture),
    description:new FormControl('', Validators.required),
    datefavorable:new FormControl(new Date(), Validators.required)
  });
  aucuneStation=signal(true);
  constructor(){
    effect(()=>{
      this.stationService.getStations(this.currentIndex(), this.pageLimit).subscribe({
        next: (data)=>{
          this.stations.set(data);
          if(data.length>0){
            this.aucuneStation.set(false)
            this.rdvform.patchValue({
              station:data[0]._id
            })
          }
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
  choisirStation(id:string){
    this.rdvform.value.station=id;
  }

  envoyerDemande(){
    const demande:DemandeRdv={
      voiture:this.rdvform.value.voiture as string,
      station:this.rdvform.value.station as string,
      description:this.rdvform.value.description as string,
      date_favorable:this.rdvform.value.datefavorable as Date
    }
    console.log(demande);
    this.demandeService.creerDemande(demande).subscribe({
      next: ()=>{
        this.router.navigate(["../.."])
      },
      error: (error:Error)=>{
        this.erreur.set(error.message);
        console.log(error)
      }
    });
  }
}
