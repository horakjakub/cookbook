import { Action } from '@ngrx/store';
import { IRecipe } from '../models/recipe';

export const ADD_RECIPE =                 '[Recipes Collection] Add Recipe';
export const REMOVE_RECIPE =              '[Recipes Collection] Remove Recipe';
export const MERGE_COLLECTIONS =          '[Recipes Collection] Merge Recipes Collections';
export const SYNCHRONISE_RECIPES_COLLECTION =  '[Recipes Collection] Recipe Collection Synchronising Started';
export const SYNCHRONISE_RECIPES_COLLECTION_SUCCESS =  '[Recipes Collection] Recipe Collection Synchronising Succeed';
export const SYNCHRONISE_RECIPES_COLLECTION_FAIL =  '[Recipes Collection] Recipe Collection Synchronising Failed';

export class AddRecipeAction implements Action {
 readonly type = ADD_RECIPE;
 constructor(public payload: IRecipe) { }
}

export class RemoveRecipeAction implements Action {
 readonly type = REMOVE_RECIPE;
 constructor(public payload: IRecipe) { }
}

export class MergeCollectionsAction implements Action {
 readonly type = MERGE_COLLECTIONS;
 constructor(public payload: IRecipe[]) { }
}

export class SynchroniseRecipesCollectionAction implements Action {
 readonly type = SYNCHRONISE_RECIPES_COLLECTION;
}

export class SynchroniseRecipesCollectionSuccessAction implements Action {
 readonly type = SYNCHRONISE_RECIPES_COLLECTION_SUCCESS;
}

export class SynchroniseRecipesCollectionFailAction implements Action {
 readonly type = SYNCHRONISE_RECIPES_COLLECTION_FAIL;
}

export type Actions
 = AddRecipeAction
 | RemoveRecipeAction
 | MergeCollectionsAction
 | SynchroniseRecipesCollectionAction
 | SynchroniseRecipesCollectionSuccessAction
 | SynchroniseRecipesCollectionFailAction;

