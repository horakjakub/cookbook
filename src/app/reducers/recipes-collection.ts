import * as recipesCollection from '../actions/recipes-collection';
import { IRecipe } from '../models/recipe';
import * as _ from 'lodash';

export interface State {
  recipesCollection: IRecipe[];
  isSynchronised: boolean;
  synchronising: boolean;
};

const initialState: State = {
  recipesCollection: [],
  isSynchronised: false,
  synchronising: false
};

export function reducer(state = initialState, action: recipesCollection.Actions): State {
  switch (action.type) {
    case recipesCollection.ADD_RECIPE: {
      const newRecipe: IRecipe = action.payload;
      const newState: State = {
        recipesCollection: state.recipesCollection.slice(),
        isSynchronised: false,
        synchronising: false
      };
      newState.recipesCollection.push(newRecipe);

      return newState;
    }

    case recipesCollection.REMOVE_RECIPE: {
      const newRecipe: IRecipe = action.payload;

      const newState: State = {
        recipesCollection: state.recipesCollection.slice(),
        isSynchronised: false,
        synchronising: false
      };

      _.remove(newState.recipesCollection,(recipe)=> recipe === newRecipe);

      return newState;
    }

    case recipesCollection.MERGE_COLLECTIONS: {
      const newCollection: IRecipe[] = action.payload;

      const newState: State = {
        recipesCollection: _.uniqBy(state.recipesCollection.slice().concat(newCollection), 'label'),
        isSynchronised: false,
        synchronising: false
      };

      return newState;
    }

    case recipesCollection.SYNCHRONISE_RECIPES_COLLECTION: {
      const newState: State = {
        recipesCollection: state.recipesCollection.slice(),
        isSynchronised: false,
        synchronising: true
      };

      return newState;
    }

    case recipesCollection.SYNCHRONISE_RECIPES_COLLECTION_SUCCESS: {
      const newState: State = {
        recipesCollection: state.recipesCollection.slice(),
        isSynchronised: true,
        synchronising: false
      };

      return newState;
    }

    case recipesCollection.SYNCHRONISE_RECIPES_COLLECTION_FAIL: {
      const newState: State = {
        recipesCollection: state.recipesCollection.slice(),
        isSynchronised: false,
        synchronising: false
      };

      return newState;
    }

    default: {
      return state;
    }
  }
}

export const getRecipesCollectionState = (state: State) => state;
export const getRecipesCollection = (state: State) => state.recipesCollection;
export const getRecipesCollectionSynchronisationState = (state: State) => state.isSynchronised;