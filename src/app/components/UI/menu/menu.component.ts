import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import * as fromRoot from '../../../reducers';
import * as layout from '../../../actions/layout';
import * as search from '../../../actions/search';
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
  sidebarVisible: boolean = false;
  favoritesRecipes: any;
  serverOnline: boolean;
  rangeValue: number = 10;

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
    this.showSidenav$.subscribe((val) => {this.sidebarVisible = val});

    this.store.select(fromRoot.getRecipesCollection).subscribe((favoriteRecipes) =>{
      this.favoritesRecipes = favoriteRecipes
    });


    this.store.select(fromRoot.getServerOnlineState).subscribe((serverOnlineStatus) =>{
      this.serverOnline = serverOnlineStatus;
      if(!this.serverOnline){
        this.store.dispatch(new layout.ShowAlertAction(
            {
              header: 'Server Offline',
              message: 'Sorry - it looks that our server is currently offline. Please come back later or use app with limited services.'
            }
        ))
      }
    });
  }

  searchForm = new FormControl();

  search(): void {
    let searchedPhrase = this.searchForm.value;
    this.store.dispatch(new search.SearchAction(searchedPhrase));
  }

  changePage(page: menuPageAdress): void {
    this.store.dispatch(go([page.url]));
    if(page.url !== 'search'){
      this.store.dispatch(new layout.CloseSidenavAction());
    }
  }

  changeSize(val: number): void {
    this.store.dispatch(new layout.SizeChangeAction(val));
  }

  toggleSidenav() {
    if(!this.sidebarVisible){
      this.store.dispatch(new layout.OpenSidenavAction());
    } else {
      this.store.dispatch(new layout.CloseSidenavAction());
    }
  }

  initSearchOnEnter(event){
    if((event.key && event.key === "enter") || (event.keyCode && event.keyCode === 13)){
      this.search();
    }
  }
}

export interface menuPageAdress {
  title: string;
  url: string;
}
