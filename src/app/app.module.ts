// ---------------- angular  ------------------- //

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';

// ---------------- ngrx  ------------------- //
import { StoreModule, Store } from '@ngrx/store';
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
import { ActivationTokenPageComponent } from './components/pages/activation-token/activation-token-page.component';

// ---------------- directives  ---------------- //
import { SearchDirective } from './directives/search.directive'

// ------------------ // http services // ------------------------//
import { HttpApiEffectsService} from './services/http-api.effects'
import { JsonpRequestService } from './services/jsonp-request.service';
import { NodeCookbookRequestsFactory } from './services/node-cookbook-requests.factory';


// ------------------ // effects // ------------------------//
import { UnstoredEffects } from './services/unstored.effects'

// ------------------- // state managing // -------------------- //
import { reducer, State } from './reducers';

// ------------------- // actions // -------------------- //

import { ServerConnectionCheckAction } from './actions/server-connection'
import { SignInSuccessAction } from './actions/sign-in'

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
    RouterModule.forRoot(routes, { useHash: false }),
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
    ActivationTokenPageComponent,
    SearchDirective,
    SidebarComponent,
    LoaderComponent,
    SignInPageComponent,
    AlertComponent
  ],
  providers: [
    JsonpRequestService,
    NodeCookbookRequestsFactory,
    Actions,
    HttpApiEffectsService,
    UnstoredEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
      private store: Store<State>,
      private httpApiEffectsService: HttpApiEffectsService
  ){
    this.store.dispatch(new ServerConnectionCheckAction());
  }
}
