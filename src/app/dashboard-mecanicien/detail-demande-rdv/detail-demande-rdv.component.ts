import { Component, computed, effect, inject, signal } from '@angular/core';
import { DemandeRdvService } from '../../services/demande-rdv.service';
import { DemandeRdvDetails, DemandeRdvMecanicien } from '../../models/demande-rdv.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Diagnostic, DiagnosticAjout } from '../../models/diagnostic.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Devis } from '../../models/devis.model';
import { environment } from '../../../environments/environment.development';

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
  devis=signal<Devis|null>(null);
  totalServicesDevis=computed(()=>{
    if(this.devis()==null){
      return 0;
    }
    let totalServices:number=0;
    for(let i=0;i<(this.devis()?.services.length as number);i++){
      totalServices=(Number(this.devis()?.services[i].tarif.$numberDecimal))+Number(totalServices);
    }
    return totalServices;
  });
  totalArticlesDevis=computed(()=>{
    if(this.devis()==null){
      return 0;
    }
    let totalArticles:number=0;
    for(let i=0;i<(this.devis()?.articles_quantites.length as number);i++){
      totalArticles+=(this.devis()?.articles_quantites[i].article.prix_unitaire.$numberDecimal as number)*(this.devis()?.articles_quantites[i].quantite as number);
    }
    return totalArticles;
  });
  totalRemisePourcentage=computed(()=>{
    if(this.devis()==null){
      return 0;
    }
    let totalRemisePourcentage:number=0;
    for(let i=0;i<(this.devis()?.remises.length as number);i++){
      totalRemisePourcentage+=(this.devis()?.remises[i].valeurRemise as number);
    }
    return totalRemisePourcentage;
  });
  remiseMontant=computed(()=>{
    if(this.devis()==null){
      return 0;
    }
    const remiseMontant:number=(this.devis()?.montant.$numberDecimal as number)*this.totalRemisePourcentage()/100;
    return remiseMontant;
  })
  etatRdvAccepte=environment.ETAT_DEMANDE_RDV_DIAG[1];

  idmecanicien=localStorage.getItem("idmecanicien");
  erreur=signal('');
  constructor(){
    effect(()=>{
      this.demandeService.getForMecanicien(this.iddemande).subscribe({
        next: (data)=>{
          this.demande.set(data);
          console.log(this.demande())
          this.demandeService.getDiagnostics(this.iddemande, this.currentIndexDiags(), this.pageLimit).subscribe({
            next: (data)=>{
              this.diagnostics.set(data);
            },
            error: (error:HttpErrorResponse)=>{
              alert(error.error.message)
            }
          });
          if(this.demande()?.etat==this.etatRdvAccepte){
            this.demandeService.getDevis(this.iddemande).subscribe({
              next: (data)=>{
                this.devis.set(data);
              },
              error: (error)=>{
                alert(error.error.message);
              }
            })
          }
        },
        error: (error:HttpErrorResponse)=>{
          alert(error.error.message)
        }
      })
    });
    effect(()=>{
      this.demandeService.getDiagnostics(this.iddemande, this.currentIndexDiags(), this.pageLimit).subscribe({
        next: (data)=>{
          this.diagnostics.set(data);
        },
        error: (error:HttpErrorResponse)=>{
          alert(error.error.message)
        }
      })
    })
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
      next: (data)=>{
        if(this.diagnostics().length<5){
          this.diagnostics().push(data);
        }
        this.countDiags.set(this.countDiags()+1)
      },
      error: (error)=>{
        this.erreur.set(error.error.message);
      }
    })
  }
}
