import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { CountryCardComponent } from '../country-card/country-card.component';
import { CountryInfoService } from '../country-info.service';

@Component({
  selector: 'app-random-countries',
  standalone: true,
  imports: [NgForOf, CountryCardComponent],
  templateUrl: './random-countries.component.html',
  styleUrl: './random-countries.component.css',
})
export class RandomCountriesComponent implements OnInit {
  randomCountries: any[] = [];

  constructor(private countryService: CountryInfoService) {}

  ngOnInit(): void {
    this.getRandomCountries();
  }

  getRandomCountries() {
    this.countryService.getAvailableCountries().subscribe(
      (data) => {
        this.getThreeRandomCountries(data).map((c) => {
          const holiday = this.countryService.getNextPublicHolidays(
            c.countryCode,
          );

          holiday.subscribe((holiday) => {
            const currentHoliday = {
              date: holiday?.shift()?.date,
              name: holiday?.shift()?.name,
            };
            this.randomCountries.push({
              name: c.name,
              nextHoliday: currentHoliday,
            });
          });
        });
      },
      (error) => console.error('Error fetching random countries', error),
    );
  }

  getThreeRandomCountries(countries: any[]): any[] {
    return countries.sort(() => 0.5 - Math.random()).slice(0, 3);
  }
}
