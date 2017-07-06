import { Component } from '@angular/core';
import { RECIPES } from './../../../services/recipes-mock.service'
import { Recipe } from './../../../models/recipe'

import { Store } from '@ngrx/store';
import * as fromRoot from './../../../reducers';
import * as layout from './../../../actions/layout';
import * as search from './../../../actions/search';
import * as recipesCollection from './../../../actions/recipesCollection';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent {
  recipes$: Observable<Recipe[]>;
  selectedRecipe: Recipe;
  favoritesRecipes: { [key: string]: Recipe };
  favoritesRecipes$: Observable<{ [key: string]: Recipe; }>;
  welcomingTexts: string[] = [
    '"Chocolate", "chocolate", "chocolate".',
    '"Lemon" flavor for a warm day',
    '"Strawberries" or "champagne"?',
    'Need an idea for a "cake"?',
    'Maybe "beef" with "mint"?',
    'Something delicious from the "grill"?'
  ];

  selectedWelcomeText: string;

  constructor(
    private _store: Store<any>
  ){
    this.recipes$ = this._store.select('currentRecipes');
    this.favoritesRecipes$ = this._store.select(fromRoot.getCurrentCollection);
    this.favoritesRecipes$.subscribe((recipesCollection)=>{
      this.favoritesRecipes = recipesCollection;
    })

    this.selectedWelcomeText = this.welcomingTexts[Math.round(Math.random() * 5)];
  }


  showRecipeDetails(event, recipe){
    this.selectedRecipe !== recipe ? this.selectedRecipe = recipe : false;
  }

  toggleToFaviorites(event, recipe){
    event.stopPropagation();
    if(!this.isFavorite(recipe)){
      this._store.dispatch(new recipesCollection.AddRescipeAction(recipe));
    } else {
      this._store.dispatch(new recipesCollection.RemoveRescipeAction(recipe));
    }
  }

  isFavorite(recipe){
    if(recipe.label in this.favoritesRecipes){
      return true;
    } else {
      return false;
    }
  }
}
