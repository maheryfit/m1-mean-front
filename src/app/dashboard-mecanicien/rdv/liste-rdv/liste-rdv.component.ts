import {Component, computed, effect, inject, signal} from '@angular/core';
import {Rdv} from '../../../models/rdv.model';
import {ActivatedRoute} from '@angular/router';
import {MecanicienService} from '../../../services/mecanicien.service';

@Component({
  selector: 'app-liste-rdv',
  imports: [],
  templateUrl: './liste-rdv.component.html',
  styleUrl: './liste-rdv.component.css'
})
export class ListeRdvComponent {
  route=inject(ActivatedRoute);
  countRdv=signal(0);
  rdvs=signal<Rdv[]>([]);
  previousIndex=computed(()=>this.currentIndex()-1);
  disabledPrevious=computed(()=>this.currentIndex()===1);
  currentIndex=signal(Number(this.route.snapshot.params['page']));
  disabledNext=computed(()=>this.currentIndex()*this.pageLimit>=this.countRdv());
  nextIndex=computed(()=>this.currentIndex()+1);
  pageLimit=5;
  mecanicienService=inject(MecanicienService);
  constructor(){
    effect(()=>{
      this.mecanicienService.getRdvEnCours(this.currentIndex(),this.pageLimit)
        .then((data)=>{
          this.rdvs.set(data[0]);
          this.countRdv.set(data[1]);
        }).catch((err)=>{
        alert(err);
      })
    })
  }
  changePage(index:number){
    this.currentIndex.set(index);
  }
}
