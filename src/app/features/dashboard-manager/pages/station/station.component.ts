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

    getSidePanelStationDetail(station: Station) {
        return`
            <div class="my-card">
                <div class="my-card-details">
                    <p class="my-text-title fs-6"><b>${station.nom} - ${station.lieu}</b></p>
                </div>
                <button class="card-button">Supprimer</button>
            </div>
        `
    }
}
