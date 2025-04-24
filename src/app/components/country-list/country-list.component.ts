import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { SortOptions } from '../../enums/sorting.enum';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent {
  private countries: Observable<Country[]> | null = null;
  public filteredCountries: Observable<Country[]> | null = null;
  public searchQuery: string = '';
  public showLoading: Observable<boolean>;
  public sortOptions = SortOptions;
  public sortingActive: { property: SortProperties; order: SortOptions } | null;

  private sortings = {
    name: {
      asc: (a: Country, b: Country) => a.name.common.localeCompare(b.name.common),
      desc: (a: Country, b: Country) => b.name.common.localeCompare(a.name.common),
    },
    population: {
      asc: (a: Country, b: Country) => a.population - b.population,
      desc: (a: Country, b: Country) => b.population - a.population,
    },
  };

  public sortingProperties: SortProperties[] = Object.keys(this.sortings) as SortProperties[];

  constructor(private countryService: CountryService) {
    this.countries = this.countryService.countries$;
    this.filteredCountries = this.countryService.countries$;
    this.showLoading = this.countryService.showLoading$;

    this.searchQuery = this.countryService.getCountrySearchKeyword();
    if (this.searchQuery) {
      this.filterCountries();
    }

    this.sortingActive = this.countryService.getActiveSorting();
    if (this.sortingActive) {
      this.sortCountries(this.sortingActive.property, this.sortingActive.order);
    }
  }

  filterCountries(): void {
    if (this.countries) {
      this.filteredCountries = this.countries.pipe(
        map((countries) =>
          countries.filter((country) =>
            country.name.common.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        )
      );
      this.countryService.setCountrySearchKeyword(this.searchQuery);
    }
  }

  sortCountries(property: SortProperties, defaultOrder?: SortOptions): void {
    let order = defaultOrder || SortOptions.ASCENDING;
    if (this.sortings[property] && this.filteredCountries) {
      if (!defaultOrder && this.sortingActive?.property == property) {
        order = this.sortingActive?.order === SortOptions.ASCENDING ? SortOptions.DESCENDING : SortOptions.ASCENDING;
      }

      this.sortingActive = { property, order };
      this.countryService.setActiveSorting(property, order);
      this.filteredCountries = this.filteredCountries.pipe(
        map((countries: Country[]) => {
          return [...countries].sort(this.sortings[property][order]);
        })
      );
    }
  }
}

export type SortProperties = keyof CountryListComponent['sortings'];