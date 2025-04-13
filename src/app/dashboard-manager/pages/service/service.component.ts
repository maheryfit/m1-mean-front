import {Component, OnInit} from '@angular/core';
import {Service} from '../../../models/service.model';
import {ServicesService} from '../../../services/services.service';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-service',
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{
    count: Number = 0
    services : Array<Service> = []

    constructor(private servicesService: ServicesService) {
    }

    async ngOnInit() {
        this.services = await lastValueFrom(this.servicesService.getAll())
        this.count = this.services.length
    }

    async removeService(id: string) {
        const resp = confirm("Voulez-vous supprimé ce service ?")
        if(resp) {
            this.servicesService.deleteById(id)
            await this.ngOnInit()
        }
    }
}
