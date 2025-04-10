import {Component, OnInit} from '@angular/core';
import {MecanicienDetails} from '../../models/mecanicien.model';
import {MecanicienService} from '../services/mecanicien.service';

@Component({
  selector: 'app-mecanicien',
  imports: [

  ],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.css'
})
export class MecanicienComponent implements OnInit{
    count: Number = 0
    mecaniciens: Array<MecanicienDetails> = []

    constructor(private mecanicienService: MecanicienService) {
    }

    async ngOnInit(): Promise<void> {
        this.mecaniciens = await this.mecanicienService.getAll()
        this.count = this.mecaniciens.length
    }

    async removeMecanicien(id: string) {
        await this.mecanicienService.deleteById(id)
        alert("Mécanicien supprimé")
        await this.ngOnInit()
    }
}
