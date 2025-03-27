import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-dashboard-client',
  imports: [RouterOutlet],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent {
  brand=environment.BRAND;
}
