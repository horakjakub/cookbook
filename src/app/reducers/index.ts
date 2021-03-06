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
import * as fromRecipesCollection from './recipes-collection';
import * as fromSignIn from './sign-in';
import * as fromSignUp from './sign-up';
import { IInternalError } from '../models/error';
import * as fromError from './error'
import * as fromServerConnection from './sever-connection'

export interface State {
  layout: fromLayout.State;
  search: fromSearch.State;
  currentRecipes: fromRecipe.State;
  recipesCollection: fromRecipesCollection.State;
  router: fromRouter.RouterState;
  signedIn: fromSignIn.State;
  signedUp: fromSignUp.State;
  errorLog: IInternalError[];
  serverOnline: boolean;
}

const reducers = {
  layout: fromLayout.reducer,
  search: fromSearch.reducer,
  currentRecipes: fromRecipe.reducer,
  recipesCollection: fromRecipesCollection.reducer,
  router: fromRouter.routerReducer,
  signedIn: fromSignIn.reducer,
  signedUp: fromSignUp.reducer,
  errorLog: fromError.reducer,
  serverOnline: fromServerConnection.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

// ----------- // Layout // --------------//
export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
export const getShowAlert = createSelector(getLayoutState, fromLayout.getShowAlert);
export const getAlertInfo = createSelector(getLayoutState, fromLayout.getAlertInfo);
export const getShowConfirm = createSelector(getLayoutState, fromLayout.getShowConfirm);
export const getConfirmInfo = createSelector(getLayoutState, fromLayout.getConfirmInfo);
export const getSize = createSelector(getLayoutState, fromLayout.getSize);

// ----------- // Search // --------------//
export const getSearchState = (state: State) => state.search;
export const getSearchRecipesLabels = createSelector(getSearchState, fromSearch.getLabels);
export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

// ----------- // Searched Recipes // --------------//
export const getFoundRecipesState = (state: State) => state.currentRecipes;
export const getFoundRecipes = createSelector(getFoundRecipesState, fromRecipe.getRecipes);

// ----------- // Recipes Collection // --------------//
export const getRecipesCollectionState = (state: State) => state.recipesCollection;
export const getRecipesCollection = createSelector(getRecipesCollectionState, fromRecipesCollection.getRecipesCollection);
export const getRecipesCollectionSynchronisationState = createSelector(getRecipesCollectionState, fromRecipesCollection.getRecipesCollectionSynchronisationState);

// ----------- // Sign In/Out // --------------//
export const getSignedInState = (state: State) => state.signedIn;
export const getSignInStatus = createSelector(getSignedInState, fromSignIn.getSignInStatus);
export const getSignInMessageStatus = createSelector(getSignedInState, fromSignIn.getSignInErrorMessage);

// ----------- // Sign Up // --------------//
export const getSignedUpState = (state: State) => state.signedUp;
export const getSignUpMessageStatus = createSelector(getSignedUpState, fromSignUp.getSignUpErrorMessage);

// ----------- // Errors // --------------//
export const getErrorLog = (state: State) => state.errorLog;

// ----------- // Server Online // --------------//
export const getServerOnlineState = (state: State) => state.serverOnline;