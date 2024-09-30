import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>, private dialog: MatDialog) {}

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog when cancel is clicked
  }

  onLogin(): void {
    // Implement login logic here
    if (this.user.email && this.user.password) {
      console.log('Login button clicked', this.user);
      // Add your login service call here
      this.dialogRef.close(); // Close the dialog after login
    } else {
      console.log('Invalid login attempt');
    }
  }

  openRegistration(): void {
    this.dialogRef.close(); // Close the login dialog
    this.dialog.open(RegistrationDialogComponent); // Open the registration dialog
  }
}
