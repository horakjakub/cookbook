import { Component } from '@angular/core';
import { RECIPES } from './../../../services/recipes-mock.service'
import { Recipe } from './../../../models/recipe'

import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as layout from './../../../actions/layout';
import * as search from './../../../actions/search';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})


export class SearchPageComponent {
  recipes$: Observable<Recipe[]>;

  constructor(
    private _store: Store<any>
  ){
    this.recipes$ = this._store.select('currentRecipes');
  }

}
