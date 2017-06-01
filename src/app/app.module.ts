import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// ---------------- ngrx  ------------------- //
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ---------------- routing  ---------------------- //
import { RouterModule } from '@angular/router';
import { routes } from './routes';

// ---------------- components  ---------------------- //
import { AppComponent } from './components/app.component';
import { MenuComponent } from './components/menu.component';
import { AutocompleteComponent } from './components/autocomplete.component';
import { SearchPageComponent } from './components/pages/search/search-page.component';
import { ContactPageComponent } from './components/pages/contact/contact-page.component';

// ------------------ // // ------------------------//
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  //  StoreModule.provideStore(reducer),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    AutocompleteComponent,
    SearchPageComponent,
    ContactPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
