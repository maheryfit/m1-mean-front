import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-mean-front-v2';
}
