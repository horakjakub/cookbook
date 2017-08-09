import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../../../models/recipe';
import * as recipesCollection from '../../../actions/recipesCollection';
import * as _ from 'lodash';
import { go } from '@ngrx/router-store';
import * as layout from '../../../actions/layout';

@Component({
        selector: 'sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  showSidenav$: Observable<boolean>;
  favoritesRecipes$: Observable<IRecipe[]>;
  signedIn$: Observable<boolean>;
  favoritesRecipes: IRecipe[];
  signedIn: boolean;

  expandedRecipes: IRecipe[] = [];
  userLogged: boolean = false;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.favoritesRecipes$ = this.store.select(fromRoot.getRecipesCollection);
    this.signedIn$ = this.store.select(fromRoot.getSignInStatus);

    this.favoritesRecipes$.subscribe((recipesCollection)=>{
      this.favoritesRecipes = recipesCollection;
    });

    this.signedIn$.subscribe((signInState)=>{
      this.signedIn = signInState;
    });
}

  toggleRecipe(recipe): void {
    if(!this.isRecipeExpanded(recipe)){
      this.expandedRecipes.push(recipe)
    } else {
      this.expandedRecipes = this.expandedRecipes.filter((expendedRecipe) => { if(expendedRecipe.label !== recipe.label){ return expendedRecipe }});
    }
  }

  removeRecipeFromFavorites(event, recipe): void {
    event.stopPropagation();
    this.store.dispatch(new recipesCollection.RemoveRecipeAction(recipe));
    this.expandedRecipes = this.expandedRecipes.filter((expendedRecipe) => { if(expendedRecipe.label !== recipe.label){ return expendedRecipe }});
  }

  isRecipeExpanded(recipe): boolean{
    if(this.expandedRecipes.filter((expendedRecipe) => { if(expendedRecipe.label === recipe.label){ return expendedRecipe }}).length !== 0){
      return true;
    } else {
      return false;
    }
  }

  goToSignIn():void {
    this.store.dispatch(go('sign-in'));
    this.store.dispatch(new layout.CloseSidenavAction());
  }
}
