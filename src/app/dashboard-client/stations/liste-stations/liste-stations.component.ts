import {AfterViewInit, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {StationService} from '../../../services/station.service';
import {ClasseStation} from '../../../models/station.model';
import * as L from 'leaflet';
import {marker} from 'leaflet';

@Component({
  selector: 'app-liste-stations',
  imports: [
    RouterLink
  ],
  templateUrl: './liste-stations.component.html',
  styleUrl: './liste-stations.component.css'
})
export class ListeStationsComponent implements AfterViewInit{
  route=inject(ActivatedRoute);
  countStation=signal(0);
  previousIndex=computed(()=>this.currentIndex()-1);
  disabledPrevious=computed(()=>this.currentIndex()===1);
  currentIndex=signal(Number(this.route.snapshot.params['page']));
  disabledNext=computed(()=>this.currentIndex()*this.pageLimit>=this.countStation());
  nextIndex=computed(()=>this.currentIndex()+1);
  pageLimit=5;
  clientService=inject(ClientService);
  stationService=inject(StationService);
  stations=signal<ClasseStation[]>([]);
  private map:L.Map|null=null;
  markers=signal<L.Marker[]>([]);
  private initMap(): void {
    this.map = L.map('map', {
      center: [-18.9864204,47.5319636],
      zoom: 15
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

  }
  constructor() {
    effect(()=>{
      this.stationService.getStations(this.currentIndex(), this.pageLimit)
        .then(data => {
          this.stations.set(data[0]);
          this.countStation.set(data[1])
          for(let i=0;i<this.stations().length;i++){
            if(i===0){
              this.map?.panTo([this.stations()[i].coordonnees.coordinates[0],this.stations()[i].coordonnees.coordinates[1]]);
            }
            this.markers().push(L.marker([this.stations()[i].coordonnees.coordinates[0],this.stations()[i].coordonnees.coordinates[1]]).addTo(this.map as L.Map));
          }
        }).catch((err)=>{
          alert(err);
        });
    });
  }
  ngAfterViewInit() {
    this.initMap();
  }
  changePage(index:number){
    for(let i=0;i<this.markers().length;i++){
      this.map?.removeLayer(this.markers()[i]);
    }
    this.markers.set([]);
    this.currentIndex.set(index);
  }
  mapFocus(event:Event, latitude:number, longitude:number){
    event.preventDefault();
    this.map?.panTo([latitude, longitude]);
  }
}
