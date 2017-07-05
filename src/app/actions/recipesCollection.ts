import { Action } from '@ngrx/store';
import { Recipe } from '../models/recipe';

export const ADD_RECIPE =             '[Recipes Collection] Add Recipe';
export const ADD_RECIPE_SUCCESS =     '[Recipes Collection] Add Recipe Success';
export const ADD_RECIPE_FAIL =        '[Recipes Collection] Add Recipe Fail';
export const REMOVE_RECIPE =             '[Recipes Collection] Remove Recipe';
export const REMOVE_RECIPE_SUCCESS =     '[Recipes Collection] Remove Recipe Success';
export const REMOVE_RECIPE_FAIL =        '[Recipes Collection] Remove Recipe Fail';

export class AddRescipeAction implements Action {
 readonly type = ADD_RECIPE;
 constructor(public payload: Recipe) { }
}

export class AddRecipeSuccesAction implements Action {
 readonly type = ADD_RECIPE_SUCCESS;
 constructor(public payload: Recipe) { }
}

export class AddRecipeFailAction implements Action {
 readonly type = ADD_RECIPE_FAIL;
 constructor(public payload: string) { }
}

export class RemoveRescipeAction implements Action {
 readonly type = REMOVE_RECIPE;
 constructor(public payload: Recipe) { }
}

export class RemoveRecipeSuccesAction implements Action {
 readonly type = REMOVE_RECIPE_SUCCESS;
 constructor(public payload: Recipe) { }
}

export class RemoveRecipeFailAction implements Action {
 readonly type = REMOVE_RECIPE_FAIL;
 constructor(public payload: string) { }
}


export type Actions
 = AddRescipeAction
 | AddRecipeSuccesAction
 | AddRecipeFailAction
 | RemoveRescipeAction
 | RemoveRecipeSuccesAction
 | RemoveRecipeFailAction;
