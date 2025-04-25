import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {environment} from '../../../../../environments/environment';
import {Station} from '../../../../models/station.model';
import {StationService} from '../../../../services/station.service';
import {lastValueFrom} from 'rxjs';

@Component({
    selector: 'app-station',
    imports: [],
    templateUrl: './station.component.html',
    styleUrl: './station.component.css'
})
export class StationComponent implements AfterViewInit, OnDestroy {
    private map!: L.Map;
    private BASE_MAP_URL = environment.BASE_MAP_URL;
    private stations: Station[] = [];
    private defaultIcon: L.Icon = L.icon({
        iconUrl: 'icon/garage.png',
        shadowUrl: '',
        iconSize: [55, 51],
        iconAnchor: [20, 25]
    });

    constructor(private stationService: StationService) {
    }


    async ngAfterViewInit() {
        this.stations = await lastValueFrom(this.stationService.getAll())
        this.initMap();
        this.fillMapWithStations();
    }

    ngOnDestroy(): void {
        this.map?.remove();
    }

    private initMap() {
        this.map = L.map('map').setView([-18.935, 47.5239], 13);
        L.tileLayer(this.BASE_MAP_URL, {
            maxZoom: 19,
        }).addTo(this.map);
    }

    private fillMapWithStations() {
        this.stations.forEach(station => {
            const latitude = station.coordonnees.coordinates[0]
            const longitude = station.coordonnees.coordinates[1]
            L.marker([latitude, longitude], {
                draggable: false,
                icon: this.defaultIcon
            }).addTo(this.map)
              .on("click", () => {
                  this.getSidePanelStationDetail(station);
              })
                //.bindPopup(`Station: <b>${station.nom} - ${station.lieu}</b>`)
                .bindPopup(this.getSidePanelStationDetail(station))
                .openPopup();
        })
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

    getSidePanelStationDetail(station: Station) {
        return`
            <div class="row">
                <div>
                    <p class="my-text-title fs-6"><b>${station.nom} - ${station.lieu}</b></p>
                </div>
                <div class="d-flex flex-row justify-content-around">
                    <button (click)="removeStation('${station._id}')" class="btn btn-outline-danger">Supprimer</button>
                    <button class="btn btn-outline-light">Modifier</button>
                </div>
            </div>
        `
    }
}
