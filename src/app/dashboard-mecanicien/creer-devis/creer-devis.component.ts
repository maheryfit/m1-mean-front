import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeRdvMecanicien } from '../../models/demande-rdv.model';
import { DemandeRdvService } from '../../services/demande-rdv.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Service } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';
import { ArticleService } from '../../services/article.service';
import { Article, QteArticle } from '../../models/article.model';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevisAjout } from '../../models/devis.model';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-creer-devis',
  imports: [ReactiveFormsModule],
  templateUrl: './creer-devis.component.html',
  styleUrl: './creer-devis.component.css'
})
export class CreerDevisComponent {
  route=inject(ActivatedRoute);
  iddemande=this.route.snapshot.paramMap.get("iddemande") as string;

  demandeService=inject(DemandeRdvService);
  serviceService=inject(ServicesService);
  articleService=inject(ArticleService);
  devisService=inject(DevisService);

  demande=signal<DemandeRdvMecanicien|null>(null);
  services=signal<Service[]>([]);
  articles=signal<Article[]>([]);
  idmecanicien=localStorage.getItem("idmecanicien");
  erreur=signal('');
  constructor(){
      effect(()=>{
        this.demandeService.getForMecanicien(this.iddemande).subscribe({
          next: (data)=>{
            this.demande.set(data);
          },
          error: (error:HttpErrorResponse)=>{
            alert(error.error.message)
          }
        })
      });
      effect(()=>{
        this.serviceService.getAll().subscribe({
          next: (data)=>{
            this.services.set(data);
          }
        })
      })
      effect(()=>{
        this.articleService.getAll().subscribe({
          next: (data)=>{
            this.articles.set(data);
          }
        })
      })
  }
  devisForm=new FormGroup({
    services:new FormArray([]),
    articles:new FormArray([]),
    date_debut_maintenance:new FormControl(new Date(), Validators.required)
  });
  choisirService(event:any){
    const servicesArray = this.devisForm.get('services') as FormArray;
    const service=event.target.value.split(' ');
    if (event.target.checked) {
      servicesArray.push(new FormControl(service[0]));
    } else {
      const index = servicesArray.controls.findIndex(x => event.target.value.startsWith(x.value));
      if (index >= 0) {
        servicesArray.removeAt(index);
      }
    }
  }
  choisirArticle(event:any){
    const articlesArray = this.devisForm.get('articles') as FormArray;
    if (event.target.checked) {
      articlesArray.push(new FormControl(event.target.value));
    } else {
      const index = articlesArray.controls.findIndex(x => x.value === event.target.value);
      if (index >= 0) {
        articlesArray.removeAt(index);
      }
    }
  }
  get articlesForm():FormArray{
    return this.devisForm.get("articles") as FormArray;
  }
  get servicesForm():FormArray{
    return this.devisForm.get("services") as FormArray;
  }
  creerDevis(){
    const articlesChoisis=this.articlesForm.value;
    const qteArticles:QteArticle[]=[];
    articlesChoisis.forEach((id:string)=>{
      const qte=document.getElementById("qteArticle"+id) as HTMLInputElement;
      const pu=document.getElementById("puArticle"+id) as HTMLInputElement;
      const qteNb=qte.value.length==0?0:Number(qte.value);
      if(qteNb<=0){
        return;
      }
      qteArticles.push({
        article:id,
        quantite:qteNb
      })
    });
    const servicesChoisis=this.servicesForm.value;
    const devis:DevisAjout={
      voiture:this.demande()?.voiture._id as string,
      services:servicesChoisis,
      station:this.demande()?.station._id as string,
      diagnostic:this.iddemande,
      articles_quantites:qteArticles,
      mecanicien:this.idmecanicien as string,
      dateheure_debut_maintenance:this.devisForm.value.date_debut_maintenance as Date
    }
    this.devisService.creerDevis(devis).subscribe({
      error: (error)=>{
        this.erreur.set(error.error.message);
      }
    });
  }
}
