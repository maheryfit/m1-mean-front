import { Component } from '@angular/core';
import { TextOverflowPipe } from '../../../utils/pipes/text-overflow.pipe';

@Component({
  selector: 'app-voiture',
  imports: [TextOverflowPipe],
  templateUrl: './voiture.component.html',
  styleUrl: './voiture.component.css'
})
export class VoitureComponent {

}
