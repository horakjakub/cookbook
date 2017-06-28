import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Jsonp, Response } from '@angular/http';

// ---------------- ngrx  ------------------- //
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
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
import { SidebarComponent } from './components/sidebar.component';
import { LoaderComponent } from './components/UI/loader.component';


// ---------------- directives  ---------------- //
import { SearchDirective } from './directives/search.directive'

// ------------------ // http services // ------------------------//
import { ApiService} from './services/api.service'
import { JsonpRequestService } from './services/jsonp-request.service';

// ------------------- // state managing // -------------------- //
import { reducer } from './reducers';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(routes, { useHash: true }),
    JsonpModule,
    EffectsModule.run(ApiService)
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    AutocompleteComponent,
    SearchPageComponent,
    ContactPageComponent,
    SearchDirective,
    SidebarComponent,
    LoaderComponent
  ],
  providers: [
    JsonpRequestService,
    ApiService,
    Actions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
  }
}
