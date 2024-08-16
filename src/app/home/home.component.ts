import { Component, DestroyRef, OnInit } from '@angular/core';
import { RandomCountriesComponent } from '../random-countries/random-countries.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CountryInfoService } from '../country-info.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    RandomCountriesComponent,
    RouterLink,
    FormsModule,
    NgForOf,
    RouterOutlet,
    MatLabel,
    MatFormField,
  ],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  searchTerm: string = '';

  constructor(private countryInfoService: CountryInfoService) {}

  ngOnInit(): void {
    this.searchTerm = this.countryInfoService.currentSearchPattern;
    this.searchCountries();
  }

  searchCountries() {
    this.countryInfoService.currentSearchPattern = this.searchTerm;
    if (this.searchTerm.length < 2) return;

    this.countryInfoService.getAvailableCountries().subscribe({
      next: (data) => {
        this.countries = data.filter((t) => {
          const name: string = t.name;
          return name.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      },
    });
  }
}
