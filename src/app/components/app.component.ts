import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <menu></menu>
    <router-outlet></router-outlet>
    <sidebar></sidebar>
    <loader></loader>
    <alert></alert>
  `
})

export class AppComponent {

}
