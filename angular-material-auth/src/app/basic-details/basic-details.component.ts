import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgIf,
    NgClass,
    MatGridListModule,
  ]
})
export class BasicDetailsComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';
  password: string = '';
  confirmPassword: string = '';

  validateBasicDetails(form: any): boolean {
    return form.valid && this.password === this.confirmPassword;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidMobile(mobile: string): boolean {
    const mobileRegex = /^\d{10}$/; // Adjust regex as needed
    return mobileRegex.test(mobile);
  }
}
