import { Component, Input } from '@angular/core';
import * as L from "leaflet";

@Component({
  selector: 'app-station',
  imports: [],
  templateUrl: './station.component.html',
  styleUrl: './station.component.css'
})
export class StationComponent {
  @Input() _id='';
  @Input() nom='';
  @Input() lieu='';
  @Input() latitude=0;
  @Input() longitude=0;
  @Input() checked=false;
  map:any;
  marker:any;
  ngAfterViewInit(){
    const modalElement = document.getElementById(`station${this._id}`);
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.map.invalidateSize();
        this.map.setView([this.latitude, this.longitude], 13);
      });
    }
    this.map=L.map(`mapStation${this._id}`).setView([this.latitude, this.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.marker=L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
}
