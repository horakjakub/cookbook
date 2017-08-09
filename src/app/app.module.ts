// ---------------- angular  ------------------- //

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';

// ---------------- ngrx  ------------------- //
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ---------------- routing  ---------------------- //
import { RouterModule } from '@angular/router';
import { routes } from './routes';

// ---------------- components  ---------------------- //
import { AppComponent } from './components/app.component';

import { MenuComponent } from './components/UI/menu/menu.component';
import { AutocompleteComponent } from './components/UI/autocomplete/autocomplete.component';
import { SidebarComponent } from './components/UI/sidebar/sidebar.component';
import { LoaderComponent } from './components/UI/loader/loader.component';
import { AlertComponent } from './components/UI/alert/alert.component';

import { SearchPageComponent } from './components/pages/search/search-page.component';
import { ContactPageComponent } from './components/pages/contact/contact-page.component';
import { SignInPageComponent } from './components/pages/sign-in/sign-in.component';

// ---------------- directives  ---------------- //
import { SearchDirective } from './directives/search.directive'

// ------------------ // http services // ------------------------//
import { HttpApiEffectsService} from './services/http-api.effects'
import { JsonpRequestService } from './services/jsonp-request.service';
import { NodeCookbookRequestsFactory } from './services/node-cookbook-requests.factory';

// ------------------- // state managing // -------------------- //
import { reducer } from './reducers';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer, {
      router: {
        path: window.location.pathname + window.location.search
      }
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(routes, { useHash: true }),
    RouterStoreModule.connectRouter(),
    JsonpModule,
    HttpClientModule,
    EffectsModule.run(HttpApiEffectsService)
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    AutocompleteComponent,
    SearchPageComponent,
    ContactPageComponent,
    SearchDirective,
    SidebarComponent,
    LoaderComponent,
    SignInPageComponent,
    AlertComponent
  ],
  providers: [
    JsonpRequestService,
    NodeCookbookRequestsFactory,
    Actions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
  }
}
