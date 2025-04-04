import { Component, computed, effect, inject, signal } from '@angular/core';
import { DemandeRdvService } from '../../services/demande-rdv.service';
import { DemandeRdvDetails, DemandeRdvMecanicien } from '../../models/demande-rdv.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Diagnostic, DiagnosticAjout } from '../../models/diagnostic.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-demande-rdv',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './detail-demande-rdv.component.html',
  styleUrl: './detail-demande-rdv.component.css'
})
export class DetailDemandeRdvMecanicienComponent {
  pageLimit=5;

  countDiags=signal(0);
  previousIndexDiags=computed(()=>this.currentIndexDiags()-1);
  currentIndexDiags=signal(1);
  nextIndexDiags=computed(()=>this.currentIndexDiags()+1);

  route=inject(ActivatedRoute);
  iddemande=this.route.snapshot.paramMap.get("iddemande") as string;
  demandeService=inject(DemandeRdvService);
  demande=signal<DemandeRdvMecanicien|null>(null);
  diagnostics=signal<Diagnostic[]>([]);

  idmecanicien=localStorage.getItem("idmecanicien");
  erreur=signal('');
  constructor(){
    effect(()=>{
      this.demandeService.getForMecanicien(this.iddemande).subscribe({
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
  diagForm=new FormGroup({
    evaluations:new FormControl('', Validators.required)
  });
  ajouterDiagnostic(){
    const diagnostic:DiagnosticAjout={
      rdv:this.iddemande,
      evaluations:this.diagForm.value.evaluations as string,
      mecaniciens:[this.idmecanicien as string]
    }
    this.demandeService.ajouterDiagnostic(this.iddemande, diagnostic).subscribe({
      next: ()=>{
        window.location.reload();
      },
      error: (error)=>{
        this.erreur.set(error.error.message);
      }
    })
  }
}
