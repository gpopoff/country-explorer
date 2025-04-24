import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs';
import { Country } from '../models/country.model';
import { SortOptions } from '../enums/sorting.enum';
import { SortProperties } from '../components/country-list/country-list.component';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  private countries$$ = new BehaviorSubject<Country[]>([]);
  public countries$ = this.countries$$.asObservable();

  private showLoading$$ = new BehaviorSubject<boolean>(true);
  public showLoading$ = this.showLoading$$.asObservable();

  private activeSorting: { property: SortProperties; order: SortOptions } | null = null;
  private countrySearchKeyword: string = '';

  constructor(private http: HttpClient) { }

  getCountries(): void {
    this.showLoading$$.next(true);
    this.http.get<Country[]>(`${this.apiUrl}/all?fields=name,region,population,ccn3`).pipe(
      catchError((error) => {
        console.error('Error fetching countries:', error);
        this.showLoading$$.next(false);
        return of([]);
      }),
      finalize(() => this.showLoading$$.next(false))
    ).subscribe((countries) => this.countries$$.next(countries));
  }

  getCountryByName(ccn3: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alpha?codes=${ccn3}&fields=name,flags,population,region`).pipe(
        map((data) => data[0]),
        catchError((error) => {
          console.error('Error fetching country details:', error);
          return of(null);
        })
      );
  }

  setActiveSorting(property: SortProperties, order: SortOptions): void {
    this.activeSorting = { property, order };
  }

  getActiveSorting(): { property: SortProperties; order: SortOptions } | null {
    return this.activeSorting;
  }

  setCountrySearchKeyword(keyword: string): void {
    this.countrySearchKeyword = keyword;
  }

  getCountrySearchKeyword(): string {
    return this.countrySearchKeyword;
  }
}