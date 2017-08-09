import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import * as fromRoot from '../../../reducers';
import * as layout from '../../../actions/layout';
import * as search from '../../../actions/search';
import { Observable } from 'rxjs/Observable';

import { IRecipe } from '../../../models/recipe';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  menuPages:menuPageAdress[] = [
    {
      title: 'Search',
      url: 'search'
    },
    {
      title: 'Sign In',
      url: 'sign-in'
    },
    // {
    //   title: 'Contact',
    //   url: 'contact'
    // }
  ];

  selectedPage$: Observable<string>;
  signedIn$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  sidebarVisibe: boolean = false;
  favoritesRecipes: any;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
    ){
    this.selectedPage$ = this.store.select('router');
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.signedIn$ = this.store.select(fromRoot.getSignInStatus);
    this.signedIn$.subscribe((val) => {
      if(val === true){
        this.store.dispatch(go(['search']));
        this.store.dispatch(new layout.OpenSidenavAction());
      }
    });
    this.showSidenav$.subscribe((val) => {this.sidebarVisibe = val})
    this.store.select(fromRoot.getRecipesCollection).subscribe((favoriteRecipes) =>{
      this.favoritesRecipes = favoriteRecipes
    })
  }

    changePage(page: menuPageAdress): void {
    this.store.dispatch(go([page.url ]));
  }

  toggleSidenav() {
    if(!this.sidebarVisibe){
      this.store.dispatch(new layout.OpenSidenavAction());
    } else {
      this.store.dispatch(new layout.CloseSidenavAction());
    }
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
