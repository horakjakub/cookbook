import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../reducers';
import * as layout from './../actions/layout';
import { Observable } from 'rxjs/Observable';
import { Recipe } from './../models/recipe';
import * as recipesCollection from './../actions/recipesCollection';
import * as _ from 'lodash';
import { RECIPES } from './../services/recipes-mock.service'

@Component({
        selector: 'sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  showSidenav$: Observable<boolean>;
  favoritesRecipes$: Observable<{ [key: string]: Recipe; }>;
  favoritesRecipes: Recipe[];
  expandedRecipes: Recipe[] = [];

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.favoritesRecipes$ = this.store.select(fromRoot.getCurrentCollection);

    this.favoritesRecipes$.subscribe((recipesCollection)=>{
      this.favoritesRecipes = _.values(recipesCollection);
    })
  }

  toggleRecipe(recipe){
    if(!this.isRecipeExpanded(recipe)){
      this.expandedRecipes.push(recipe)
    } else {
      this.expandedRecipes = this.expandedRecipes.filter((expendedRecipe) => { if(expendedRecipe.label !== recipe.label){ return expendedRecipe }});
    }
  }

  removeRecipeFromFavorites(event, recipe){
    event.stopPropagation();
    this.store.dispatch(new recipesCollection.RemoveRescipeAction(recipe));
    this.expandedRecipes = this.expandedRecipes.filter((expendedRecipe) => { if(expendedRecipe.label !== recipe.label){ return expendedRecipe }});
  }

  isRecipeExpanded(recipe){
    if(this.expandedRecipes.filter((expendedRecipe) => { if(expendedRecipe.label === recipe.label){ return expendedRecipe }}).length !== 0){
      return true;
    } else {
      return false;
    }
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenavAction());
  }
}
