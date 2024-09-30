import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

interface Location {
  name: string;
  code: string;
}

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    CommonModule
  ]
})
export class AddressDetailsComponent {
  country: string = '';
  state: string = '';
  city: string = '';
  pincode: string = '';
  address: string = '';

  countries: string[] = ['India', 'USA'];

  states: { [key: string]: Location[] } = {
    India: [
      { name: 'Maharashtra', code: 'MH' },
      { name: 'Karnataka', code: 'KA' }
    ],
    USA: [
      { name: 'California', code: 'CA' },
      { name: 'New York', code: 'NY' }
    ]
  };

  cities: { [key: string]: Location[] } = {
    MH: [
      { name: 'Mumbai', code: 'MUM' },
      { name: 'Pune', code: 'PUN' },
      { name: 'Nagpur', code: 'NAG' }
    ],
    KA: [
      { name: 'Bengaluru', code: 'BLR' },
      { name: 'Mysuru', code: 'MYS' },
      { name: 'Hubli', code: 'HUB' }
    ],
    CA: [
      { name: 'Los Angeles', code: 'LA' },
      { name: 'San Francisco', code: 'SF' },
      { name: 'San Diego', code: 'SD' }
    ],
    NY: [
      { name: 'New York City', code: 'NYC' },
      { name: 'Buffalo', code: 'BUF' },
      { name: 'Rochester', code: 'ROC' }
    ]
  };

  selectedStates: Location[] = [];
  selectedCities: Location[] = [];

  onCountryChange(event: any) {
    this.selectedStates = this.states[event.value] || [];
    this.state = '';
    this.city = '';
    this.selectedCities = [];
  }

  onStateChange(event: any) {
    this.selectedCities = this.cities[event.value] || [];
    this.city = '';
  }
  submitForm(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', form.value);
      // Add your form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }
}
