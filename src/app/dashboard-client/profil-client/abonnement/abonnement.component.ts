import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-abonnement',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './abonnement.component.html',
  styleUrl: './abonnement.component.css'
})
export class AbonnementComponent {
  @Input() id='';
  @Input() nom='';
  @Input() couleur='';
  @Input() prix='';
  @Input() checked=false;
}
