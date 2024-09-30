import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { AddressDetailsComponent } from '../address-details/address-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { CountryService } from './country.service';

@Component({
  selector: 'app-registration-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatStepperModule,
    BasicDetailsComponent,
    OrganizationDetailsComponent,
    AddressDetailsComponent
  ],
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  basicDetailsForm!: FormGroup;
  organizationDetailsForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
  ) {}

  ngOnInit() {
    this.basicDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });

    this.organizationDetailsForm = this.fb.group({
      organizationName: ['', Validators.required],
    });

    this.addressDetailsForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: ['', Validators.required],
    });

    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      (data: any) => {
        this.countries = data;
      },
      error => {
        console.error('Error fetching countries', error);
      }
    );
  }

  onCountryChange(countryId: string): void {
    this.countryService.getStates(countryId).subscribe(
      (data: any) => {
        this.states = data;
        this.cities = []; // Clear cities if country changes
        this.addressDetailsForm.get('state')?.setValue(''); // Reset state selection
        this.addressDetailsForm.get('city')?.setValue(''); // Reset city selection
      },
      error => {
        console.error('Error fetching states', error);
      }
    );
  }

  onStateChange(stateId: string): void {
    this.countryService.getCities(stateId).subscribe(
      (data: any) => {
        this.cities = data;
        this.addressDetailsForm.get('city')?.setValue(''); // Reset city selection
      },
      error => {
        console.error('Error fetching cities', error);
      }
    );
  }

  passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  // Handle registration submission
  onRegister() {
    if (this.basicDetailsForm.valid && this.organizationDetailsForm.valid && this.addressDetailsForm.valid) {
      // Handle registration logic here, like sending data to an API
      console.log('Registration complete');
      this.dialogRef.close();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Cancel the dialog
  onCancel() {
    this.dialogRef.close();
  }

  // Option to navigate to the login dialog/page
  openLogin() {
    // Open login dialog or navigate to login page
  }

  // Example validation functions
  get passwordMismatch(): boolean {
    return this.basicDetailsForm.get('password')?.value !== this.basicDetailsForm.get('confirmPassword')?.value;
  }
}
