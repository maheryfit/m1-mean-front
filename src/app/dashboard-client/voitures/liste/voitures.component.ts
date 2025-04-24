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
  disabledPrevious=computed(()=>this.currentIndex()===1);
  currentIndex=signal(Number(this.route.snapshot.params['page']));
  nextIndex=computed(()=>this.currentIndex()+1);
  disabledNext=computed(()=>this.currentIndex()*this.pageLimit>=this.countVoitures());
  pageLimit=5;
  clientService=inject(ClientService);
  voitures=signal<ClasseVoiture[]>([]);
  constructor(){
    effect(()=>{
      this.clientService.getVoitures(this.currentIndex(),this.pageLimit)
        .then((data)=>{
          this.voitures.set(data[0]);
          this.countVoitures.set(data[1]);
        }).catch((err)=>{
          alert(err);
      });
    });
  }
  changePage(index:number){
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
        this.voitures.set(data[0]);
      })
      .catch(err=>{
        alert(err);
      });
  }
}
