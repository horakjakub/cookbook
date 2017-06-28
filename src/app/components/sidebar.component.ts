import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../reducers';
import * as layout from './../actions/layout';
import { Observable } from 'rxjs/Observable';

@Component({
        selector: 'sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  showSidenav$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenavAction());
  }
}
