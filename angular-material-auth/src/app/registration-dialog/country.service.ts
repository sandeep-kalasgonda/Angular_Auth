import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://api.countrystatecity.in/v1';
  private apiKey = 'bGhkQUVuUDEyN0xpaVBEcTV1TTFDMnVla2gyRGhlMmRvOW04eldhdA==';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('X-CSCAPI-KEY', this.apiKey);
  }

  private handleError(error: HttpErrorResponse) {
    // Handle different error scenarios here
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getStates(countryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries/${countryId}/states`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCities(stateId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/states/${stateId}/cities`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}
