import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryListComponent } from './country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { Country } from '../../models/country.model';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let mockCountryService: jasmine.SpyObj<CountryService>;

  const mockCountries: Country[] = [
    { name: { common: 'France' }, population: 67000000, region: 'Europe', flags: { svg: '' }, ccn3: '250' },
    { name: { common: 'Germany' }, population: 83000000, region: 'Europe', flags: { svg: '' }, ccn3: '276' },
    { name: { common: 'Bulgaria' }, population: 211000000, region: 'Europe', flags: { svg: '' }, ccn3: '321' },
  ];

  beforeEach(async () => {
    mockCountryService = jasmine.createSpyObj('CountryService', [
      'getCountrySearchKeyword',
      'setCountrySearchKeyword',
      'getActiveSorting'
    ]);

    mockCountryService.countries$ = of(mockCountries);
    mockCountryService.getActiveSorting.and.returnValue(null); // Mock the return value of getActiveSorting

    await TestBed.configureTestingModule({
      declarations: [CountryListComponent],
      providers: [{ provide: CountryService, useValue: mockCountryService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter countries based on searchQuery', (done) => {
    component.searchQuery = 'Bulgaria';
    component.filterCountries();

    component.filteredCountries?.subscribe((filtered) => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].name.common).toBe('Bulgaria');
      done();
    });
  });

  it('should return all countries if searchQuery is empty', (done) => {
    component.searchQuery = '';
    component.filterCountries();

    component.filteredCountries?.subscribe((filtered) => {
      expect(filtered.length).toBe(3);
      done();
    });
  });

  it('should return no countries if searchQuery does not match any country', (done) => {
    component.searchQuery = 'noSuchCountry';
    component.filterCountries();

    component.filteredCountries?.subscribe((filtered) => {
      expect(filtered.length).toBe(0);
      done();
    });
  });
});