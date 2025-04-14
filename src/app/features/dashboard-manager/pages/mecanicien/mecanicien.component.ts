import {Component, computed, OnInit, signal, ViewChild} from '@angular/core';
import {MecanicienDetails} from '../../../../models/mecanicien.model';
import {MecanicienService} from '../../services/mecanicien.service';
import {Service} from '../../../../models/service.model';
import {ServicesService} from '../../../../services/services.service';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-mecanicien',
  imports: [
    PaginationComponent

  ],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.css'
})
export class MecanicienComponent{

    constructor(protected mecanicienService: MecanicienService) {
    }

    countSignal = signal(0)
    mecaniciensSignal = signal<MecanicienDetails[]>([])

    mecaniciens = computed(() => {
        return this.mecaniciensSignal()
    })

    count = computed(() => {
        return this.countSignal()
    })

    @ViewChild(PaginationComponent) pagination: PaginationComponent | undefined;
    async removeMecanicien(id: string) {
        const resp = confirm("Voulez-vous supprimé ce mécanicien ?")
        if(resp) {
            this.mecanicienService.deleteById(id).subscribe({
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
