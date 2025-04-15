import {Component, computed, signal, ViewChild} from '@angular/core';
import {PaginationComponent} from "../../../../shared/components/pagination/pagination.component";
import {MecanicienService} from '../../services/mecanicien.service';
import {MecanicienDetails} from '../../../../models/mecanicien.model';
import {RoleMecanicien} from '../../models/role-mecanicien.model';
import {RoleMecanicienService} from '../../services/role-mecanicien.service';

@Component({
  selector: 'app-role-mecanicien',
    imports: [
        PaginationComponent
    ],
  templateUrl: './role-mecanicien.component.html',
  styleUrl: './role-mecanicien.component.css'
})
export class RoleMecanicienComponent {
    constructor(protected roleMecanicienService: RoleMecanicienService) {
    }

    countSignal = signal(0)
    roleMecaniciensSignal = signal<RoleMecanicien[]>([])

    roleMecaniciens = computed(() => {
        return this.roleMecaniciensSignal()
    })

    count = computed(() => {
        return this.countSignal()
    })

    @ViewChild(PaginationComponent) pagination: PaginationComponent | undefined;
    async removeRoleMecanicien(id: string) {
        const resp = confirm("Voulez-vous supprimé ce mécanicien ?")
        if(resp) {
            this.roleMecanicienService.deleteById(id).subscribe({
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
