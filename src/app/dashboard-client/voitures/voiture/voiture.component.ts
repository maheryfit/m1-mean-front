import { Component, Input } from '@angular/core';
import { TextOverflowPipe } from '../../../utils/pipes/text-overflow.pipe';

@Component({
  selector: 'app-voiture',
  imports: [TextOverflowPipe],
  templateUrl: './voiture.component.html',
  styleUrl: './voiture.component.css'
})
export class VoitureComponent {
  @Input() id='';
  @Input() description='';
  @Input() immatriculation='';
  @Input() modele='';
  @Input() type='';
  @Input() moteur='';
  @Input() transmission='';
  @Input() traction='';
}
