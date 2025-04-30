import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Rdv} from '../../../models/rdv.model';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {ClientService} from '../../../services/client.service';
import {ServicesService} from '../../../services/services.service';
import {ClasseService} from '../../../models/service.model';

@Component({
  selector: 'app-details-rdv',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './details-rdv.component.html',
  styleUrl: './details-rdv.component.css'
})
export class DetailsRdvComponent {
  route=inject(ActivatedRoute)
  idrdv=this.route.snapshot.params['idrdv'];
  pageListeRdv=this.route.snapshot.params['page'];
  clientService=inject(ClientService);
  rdv=signal<Rdv>(new Rdv());

  countServices=signal(0);
  previousIndexService=computed(()=>this.currentIndexService()-1);
  disabledPreviousService=computed(()=>this.currentIndexService()===1);
  currentIndexService=signal(1);
  nextIndexService=computed(()=>this.currentIndexService()+1);
  disabledNextService=computed(()=>this.currentIndexService()*this.pageLimitService>=this.countServices());
  pageLimitService=5;
  serviceService=inject(ServicesService);
  services=signal<ClasseService[]>([]);

  erreurService=signal("");
  constructor(){
    this.clientService.getDetailsRdv(this.idrdv)
      .then((data)=>{
        this.rdv.set(data);
      }).catch((err)=>{
        alert(err);
    });
    effect(()=>{
      this.serviceService.getServices(this.currentIndexService(),this.pageLimitService)
        .then(data=>{
          this.services.set(data[0]);
          this.countServices.set(data[1]);
        }).catch(error => {
        alert(error);
      })
    });
  }
  changePageService(index:number){
    this.currentIndexService.set(index);
  }
  choisirService(event:Event,index:number){
    event.preventDefault();
    const serviceToAdd=this.services()[index];
    this.clientService.ajouterServiceRdv(this.idrdv,serviceToAdd)
      .then(()=>{
        this.rdv().services.push(serviceToAdd);
      }).catch(err=>{
        this.erreurService.set(err);
    })
  }

  protected readonly environment = environment;
}
