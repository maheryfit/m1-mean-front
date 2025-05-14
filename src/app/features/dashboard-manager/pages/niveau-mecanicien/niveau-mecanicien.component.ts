import {Component, computed, signal, ViewChild} from '@angular/core';
import {PaginationComponent} from "../../../../shared/components/pagination/pagination.component";
import {NiveauMecanicienService} from '../../services/niveau-mecanicien.service';
import {NiveauMecanicien} from '../../models/niveau-mecanicien.model';

@Component({
  selector: 'app-niveau-mecanicien',
    imports: [
        PaginationComponent
    ],
  templateUrl: './niveau-mecanicien.component.html',
  styleUrl: './niveau-mecanicien.component.css'
})
export class NiveauMecanicienComponent {
    constructor(protected niveauMecanicienService: NiveauMecanicienService) {
    }

    countSignal = signal(0)
    niveauMecaniciensSignal = signal<NiveauMecanicien[]>([])

    niveauMecaniciens = computed(() => {
      return this.niveauMecaniciensSignal()
    })

    count = computed(() => {
        return this.countSignal()
    })

    @ViewChild(PaginationComponent) pagination: PaginationComponent | undefined;
    async removeNiveauMecanicien(id: string) {
        const resp = confirm("Voulez-vous supprimé ce niveau de mécanicien ?")
        if(resp) {
            this.niveauMecanicienService.deleteById(id).subscribe({
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
