import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';


/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

import * as fromLayout from './layout';
import * as fromSearch from './search';
import * as fromRecipe from './recipe';
import * as fromRecipesCollection from './recipesCollection';

export interface State {
  layout: fromLayout.State;
  search: fromSearch.State;
  currentRecipes: fromRecipe.State;
  recipesCollection: fromRecipesCollection.State;
  router: fromRouter.RouterState;
}

const reducers = {
  layout: fromLayout.reducer,
  search: fromSearch.reducer,
  currentRecipes: fromRecipe.reducer,
  recipesCollection: fromRecipesCollection.reducer,
  router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);

export const getSearchState = (state: State) => state.search;
export const getSearchRecipesLabels = createSelector(getSearchState, fromSearch.getLabels);
export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

export const getCurrentRecipesState = (state: State) => state.currentRecipes;
export const getCurrentRecipes = createSelector(getCurrentRecipesState, fromRecipe.getRecipes);

export const getCurrentCollection = (state: State) => state.recipesCollection;
