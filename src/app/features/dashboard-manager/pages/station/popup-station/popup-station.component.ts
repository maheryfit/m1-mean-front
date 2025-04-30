import {Component, Input} from '@angular/core';
import {Station} from '../../../../../models/station.model';
import {StationService} from '../../../../../services/station.service';

@Component({
  selector: 'app-popup-station',
  imports: [],
  templateUrl: './popup-station.component.html',
  styleUrl: './popup-station.component.css'
})
export class PopupStationComponent {
    @Input() station!: Station;

    constructor(private stationService: StationService) {
    }


    async removeStation(id: string) {
        const resp = confirm("Voulez-vous supprimé ce station ?")
        if(resp) {
            this.stationService.deleteById(id).subscribe({
                next: resp => {
                    console.log(resp);
                },
                error: err => {
                    alert(err.error.message)
                }
            })
        }
    }
}
