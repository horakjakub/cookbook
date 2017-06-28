import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ApiService} from './../services/api.service'
import { Store } from '@ngrx/store';
import * as fromRoot from './../reducers';

import * as layout from './../actions/layout';
import * as search from './../actions/search';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  menuPages:menuPageAdress[] = [
    {
      title: 'Search',
      url: ''
    },
    {
      title: 'Contact',
      url: 'contact'
    }
  ];

  selectedPage:menuPageAdress = this.menuPages[0];
  showSidenav$: Observable<boolean>;
  sidebarVisibe: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store<fromRoot.State>
    ){
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
  }

  changePage(page: menuPageAdress): void {
    this.selectedPage = page;
    this.router.navigate([page.url]);
  }

  toggleSidenav() {
    let sidebarVisibe:boolean;
    this.showSidenav$.subscribe((val) =>{ sidebarVisibe = val });

    if(!this.sidebarVisibe){
      this.store.dispatch(new layout.OpenSidenavAction());
    } else {
      this.store.dispatch(new layout.CloseSidenavAction());
    };

    this.sidebarVisibe = !this.sidebarVisibe;
  }

  searchForm = new FormControl();

  initSearchOnEnter(event){
    if((event.key && event.key === "enter") || (event.keyCode && event.keyCode === 13)){
      this.search();
    }
  }

  search(): void {
    let searchedPhrase = this.searchForm.value;
    this.store.dispatch(new search.SearchAction(searchedPhrase));
  }
}

export interface menuPageAdress {
  title: string;
  url: string;
}
