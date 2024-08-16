import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryInfoService {
  private baseUrl = 'https://date.nager.at/api/v3';

  currentSearchPattern: string ='';

  constructor(private http: HttpClient) {}

  getHolidays(code: string, year: number): Observable<any[]> {
    const url = `${this.baseUrl}/PublicHolidays/${year}/${code}`;
    return this.http.get<any[]>(url);
  }

  getNextPublicHolidays(code: string): Observable<any[]> {
    const url = `${this.baseUrl}/NextPublicHolidays/${code}`;
    return this.http.get<any[]>(url);
  }

  getCountryDetails(code: string): Observable<any[]> {
    const url = `${this.baseUrl}/CountryInfo/${code}`;
    return this.http.get<any[]>(url);
  }

  getAvailableCountries(): Observable<any[]> {
    const url = `${this.baseUrl}/AvailableCountries`;
    return this.http.get<any[]>(url);
  }
}

