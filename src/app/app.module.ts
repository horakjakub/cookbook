import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
