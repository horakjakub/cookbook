import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// ---------------- components  ---------------------- //

import { AppComponent } from './app.component';
import { MenuComponent } from './menu.component';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
