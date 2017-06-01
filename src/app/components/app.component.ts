import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <menu></menu>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
}
