import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RegistrationDialogComponent,
    LoginDialogComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-auth';

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openRegistrationDialog() {
    this.dialog.open(RegistrationDialogComponent);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}
