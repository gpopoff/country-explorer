import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, } from '@angular/router';
import { CommonModule } from '@angular/common';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryDetailComponent,
    NumberFormatPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}