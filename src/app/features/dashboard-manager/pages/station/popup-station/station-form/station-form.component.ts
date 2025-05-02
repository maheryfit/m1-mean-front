import {Component, Input, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-station-form',
  imports: [],
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.css'
})
export class StationFormComponent {
    @Input() cssOpen: WritableSignal<string>=signal("");
}
