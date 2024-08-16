import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {CountryInfoService} from "../country-info.service";


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgClass
  ],
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country: any;
  holidays: any[] = [];
  year: number = new Date().getFullYear();
  code: any | undefined;
  allYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  constructor(private route: ActivatedRoute, private countryInfoService: CountryInfoService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
      if (this.code) {
        this.getCountryDetails(this.code);
        this.getHolidays(this.code, this.year);
      }
    });
  }

  getCountryDetails(code: string) {
    this.countryInfoService.getCountryDetails(code).subscribe({
      next: data => this.country = data,
      error: error => console.error('Error fetching country details', error),
    });
  }

  getHolidays(code: string, year: number) {
    this.countryInfoService.getHolidays(code, year).subscribe({
      next: data=> this.holidays = data,
      error: error=> console.error('Error fetching holidays:', error)
    });
  }

  changeYear(year: number) {
    this.year = year;
    this.getHolidays(this.country.countryCode, year);
  }

  OnClick() {
    this.router.navigate(['']);
  }
}
