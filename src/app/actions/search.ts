import { Action } from '@ngrx/store';
import { IRecipe } from '../models/recipe';

export const SEARCH =           '[Recipe] Search';
export const SEARCH_COMPLETE =  '[Recipe] Search Complete';

export class SearchAction implements Action {
 readonly type = SEARCH;

 constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
 readonly type = SEARCH_COMPLETE;

 constructor(public payload: IRecipe[]) { }
}

export type Actions
 = SearchAction
 | SearchCompleteAction;
