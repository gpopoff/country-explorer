import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
})
export class CountryDetailComponent implements OnInit {
  public country$: Observable<Country> | null = null;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    const countryName = this.route.snapshot.queryParams['ccn3'];
    if (countryName) {
      this.country$ = this.countryService.getCountryByName(countryName);
    }
  }
}