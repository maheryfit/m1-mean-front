import {Component, computed, OnInit, signal, ViewChild} from '@angular/core';
import {Service} from '../../../../models/service.model';
import {ServicesService} from '../../../../services/services.service';
import {lastValueFrom} from 'rxjs';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service',
  imports: [
    PaginationComponent
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent{
    countSignal = signal(0)
    servicesSignal = signal<Service[]>([])

    services = computed(() => {
        return this.servicesSignal()
    })

    count = computed(() => {
        return this.countSignal()
    })

    constructor(protected servicesService: ServicesService) {
    }

    @ViewChild(PaginationComponent) pagination: PaginationComponent | undefined;
    async removeService(id: string) {
        const resp = confirm("Voulez-vous supprimé ce service ?")
        if(resp) {
            this.servicesService.deleteById(id).subscribe({
                next: resp => {
                    this.pagination?.changeEffectCount()
                    this.pagination?.changeEffectList()
                },
                error: err => {
                    alert(err.error.message)
                }
            })
        }
    }
}
