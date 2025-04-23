import { Component, computed, effect, inject, signal } from '@angular/core';
import { VoituresService } from '../../../services/voitures.service';
import {ClasseVoiture, Voiture} from '../../../models/voiture.model';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-voitures',
  imports: [RouterLink],
  templateUrl: './voitures.component.html',
  styleUrl: './voitures.component.css'
})
export class VoituresComponent {
  route=inject(ActivatedRoute);
  countVoitures=signal(0);
  previousIndex=computed(()=>this.currentIndex()-1);
  currentIndex=signal(Number(this.route.snapshot.params['page']));
  nextIndex=computed(()=>this.currentIndex()+1);
  pageLimit=5;
  clientService=inject(ClientService);
  voitureService=inject(VoituresService);
  voitures=signal<ClasseVoiture[]>([]);
  constructor(){
    // effect(()=>{
    //   this.voitureService.getAllVoitures(this.currentIndex(), this.pageLimit)
    //   .subscribe((data)=>{
    //     this.voitures.set(data);
    //   });
    // });
    // effect(()=>{
    //   this.voitureService.count().subscribe((data)=>{
    //     this.countVoitures.set(data);
    //   })
    // })
    effect(()=>{
      this.clientService.getVoitures(this.currentIndex(),this.pageLimit)
        .then((data)=>{
          this.voitures.set(data);
        }).catch((err)=>{
          alert(err);
      });
    });
    effect(()=>{
      this.clientService.countVoitures()
        .then((data)=>{
          this.countVoitures.set(data);
        }).catch((err)=>{
          alert(err);
        });
    })
  }
  changePage(index:number){
    if(index<=0){
      return;
    }
    if(this.countVoitures()<=((index-1)*this.pageLimit)){
      return;
    }
    this.currentIndex.set(index);
  }
  supprimer(event:Event,idvoiture:string){
    event.preventDefault();
    console.log(idvoiture);
    this.clientService.supprimerVoiture(idvoiture)
      .then(()=>{
        this.countVoitures.set(this.countVoitures()-1);
      })
      .then(()=>this.clientService.getVoitures(this.currentIndex(),this.pageLimit))
      .then((data)=>{
        this.voitures.set(data);
      })
      .catch(err=>{
        alert(err);
      });
  }
}
