import {AfterViewInit, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {StationService} from '../../../services/station.service';
import {ClasseStation} from '../../../models/station.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-liste-stations',
  imports: [],
  templateUrl: './liste-stations.component.html',
  styleUrl: './liste-stations.component.css'
})
export class ListeStationsComponent implements AfterViewInit{
  route=inject(ActivatedRoute);
  countStation=signal(0);
  previousIndex=computed(()=>this.currentIndex()-1);
  currentIndex=signal(Number(this.route.snapshot.params['page']));
  nextIndex=computed(()=>this.currentIndex()+1);
  pageLimit=5;
  clientService=inject(ClientService);
  stationService=inject(StationService);
  stations=signal<ClasseStation[]>([]);
  private map:any;
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
        .then(stations => {
          this.stations.set(stations);
          let markers=[];
          for(let i=0;i<this.stations().length;i++){
            if(i===0){
              this.map.panTo([stations[i].coordonnees.coordinates[0],stations[i].coordonnees.coordinates[1]]);
            }
            markers.push(L.marker([stations[i].coordonnees.coordinates[0],stations[i].coordonnees.coordinates[1]]).addTo(this.map));
          }
        }).catch((err)=>{
          alert(err);
        });
    });
    effect(()=>{
      this.stationService.countStations()
        .then(data => {
          this.countStation.set(data);
        }).catch((err)=>{
          alert(err);
      })
    })
  }
  ngAfterViewInit() {
    this.initMap();
  }
  changePage(index:number){
    if(index<=0){
      return;
    }
    if(this.countStation()<=((index-1)*this.pageLimit)){
      return;
    }
    this.currentIndex.set(index);
  }
  mapFocus(event:Event, latitude:number, longitude:number){
    event.preventDefault();
    this.map.panTo([latitude, longitude]);
  }
}
