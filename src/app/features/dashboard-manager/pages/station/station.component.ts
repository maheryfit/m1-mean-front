import {AfterViewInit, ApplicationRef, Component, ComponentRef, OnDestroy, ViewContainerRef} from '@angular/core';
import * as L from 'leaflet';
import {environment} from '../../../../../environments/environment';
import {Station} from '../../../../models/station.model';
import {StationService} from '../../../../services/station.service';
import {lastValueFrom} from 'rxjs';
import {PopupStationComponent} from './popup-station/popup-station.component';

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

    constructor(private stationService: StationService, private _viewContainerRef: ViewContainerRef) {
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

    fillMapWithStations() {
        this.stations.forEach(station => {
            const latitude = station.coordonnees.coordinates[0]
            const longitude = station.coordonnees.coordinates[1]
            const popup = this.createPopup(station)
            L.marker([latitude, longitude], {
                draggable: false,
                icon: this.defaultIcon
            }).addTo(this.map)
                .bindPopup(popup)
                .openPopup();
        })
    }

    private createPopup(station: Station) {
        const component : ComponentRef<PopupStationComponent> = this._viewContainerRef.createComponent(PopupStationComponent);
        component.instance.station = station;
        component.instance.stationComponent = this;
        return L.popup()
          .setLatLng([station.coordonnees.coordinates[0], station.coordonnees.coordinates[1]])
          .setContent(component.location.nativeElement)
          .openOn(this.map);
    }
}
