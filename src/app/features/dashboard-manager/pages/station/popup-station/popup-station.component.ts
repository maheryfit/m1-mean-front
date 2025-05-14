import {Component, Input, ViewChild} from '@angular/core';
import {Station} from '../../../../../models/station.model';
import {StationService} from '../../../../../services/station.service';
import {StationComponent} from '../station.component';
import {StationFormComponent} from './station-form/station-form.component';
import {PaginationComponent} from '../../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-popup-station',
  imports: [
    StationFormComponent
  ],
  templateUrl: './popup-station.component.html',
  styleUrl: './popup-station.component.css'
})
export class PopupStationComponent {
    @Input() station!: Station;
    @Input() stationComponent!: StationComponent;

    constructor(private stationService: StationService) {
    }


    async removeStation(id: string) {
        const resp = confirm("Voulez-vous supprimé ce station ?")
        if(resp) {
            this.stationService.deleteById(id).subscribe({
                next: resp => {
                    this.stationComponent.ngOnDestroy()
                    this.stationComponent.ngAfterViewInit().then(r => console.log(r));
                    console.log(resp);
                },
                error: err => {
                    alert(err.error.message)
                }
            })
        }
    }
    @ViewChild(StationFormComponent) stationForm!: StationFormComponent;
    showModalForm() {
        this.stationForm.cssOpen.set("open");
    }
}
