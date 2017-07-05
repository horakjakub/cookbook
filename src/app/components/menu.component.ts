import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ApiService} from './../services/api.service'
import { Store } from '@ngrx/store';
import * as fromRoot from './../reducers';

import * as layout from './../actions/layout';
import * as search from './../actions/search';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './../models/recipe';

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
  favoritesRecipes: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store<fromRoot.State>
    ){
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.showSidenav$.subscribe((val) => {this.sidebarVisibe = val})
    this.store.select(fromRoot.getCurrentCollection).subscribe((favoriteRecipes) =>{ this.favoritesRecipes = Object.keys(favoriteRecipes) })
  }

  changePage(page: menuPageAdress): void {
    this.selectedPage = page;
    this.router.navigate([page.url]);
  }

  toggleSidenav() {
    if(!this.sidebarVisibe){
      this.store.dispatch(new layout.OpenSidenavAction());
    } else {
      this.store.dispatch(new layout.CloseSidenavAction());
    };
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
