import { Action } from '@ngrx/store';
import { Recipe } from '../models/recipe';

export const ADD_RECIPE =             '[Recipes Collection] Add Recipe';
export const ADD_RECIPE_SUCCESS =     '[Recipes Collection] Add Recipe Success';
export const ADD_RECIPE_FAIL =        '[Recipes Collection] Add Recipe Fail';

// 
// export class SearchAction implements Action {
//  readonly type = SEARCH;
//
//  constructor(public payload: string) { }
// }

// export class SearchAction implements Action {
//  readonly type = SEARCH;
//
//  constructor(public payload: string) { }
// }
//
// export class SearchCompleteAction implements Action {
//  readonly type = SEARCH_COMPLETE;
//
//  constructor(public payload: Recipe[]) { }
// }
//
// export type Actions
//  = SearchAction
//  | SearchCompleteAction;
