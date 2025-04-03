import { Component, computed, effect, inject, signal } from '@angular/core';
import { DemandeRdvService } from '../../services/demande-rdv.service';
import { DemandeRdvDetails } from '../../models/demande-rdv.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Diagnostic } from '../../models/diagnostic.model';

@Component({
  selector: 'app-detail-demande-rdv',
  imports: [RouterLink],
  templateUrl: './detail-demande-rdv.component.html',
  styleUrl: './detail-demande-rdv.component.css'
})
export class DetailDemandeRdvComponent {
  pageLimit=10;

  countDiags=signal(0);
  previousIndexDiags=computed(()=>this.currentIndexDiags()-1);
  currentIndexDiags=signal(1);
  nextIndexDiags=computed(()=>this.currentIndexDiags()+1);

  route=inject(ActivatedRoute);
  iddemande=this.route.snapshot.paramMap.get("iddemande") as string;
  demandeService=inject(DemandeRdvService);
  demande=signal<DemandeRdvDetails|null>(null);
  diagnostics=signal<Diagnostic[]>([]);
  constructor(){
    effect(()=>{
      this.demandeService.get(this.iddemande).subscribe({
        next: (data)=>{
          this.demande.set(data);
          this.demandeService.getDiagnostics(this.iddemande, this.currentIndexDiags(), this.pageLimit).subscribe({
            next: (data)=>{
              this.diagnostics.set(data);
            },
            error: (error:HttpErrorResponse)=>{
              alert(error.error.message)
            }
          })
        },
        error: (error:HttpErrorResponse)=>{
          alert(error.error.message)
        }
      })
    });
    effect(()=>{
      this.demandeService.countDiagnostics(this.iddemande).subscribe({
        next: (data)=>{
          this.countDiags.set(data)
        },
        error: (error:HttpErrorResponse)=>{
          alert(error.error.message)
        }
      })
    })
  }
  changePageDiags(index:number){
    if(index<=0){
      return;
    }
    if(this.countDiags()-((index-1)*this.pageLimit)<=0){
      return;
    }
    this.currentIndexDiags.set(index);
  }
}
