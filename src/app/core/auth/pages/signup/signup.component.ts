import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  brand=environment.BRAND
}
