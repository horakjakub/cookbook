import * as recipesCollection from '../actions/recipesCollection';
import { Recipe } from '../models/recipe';
import * as _ from 'lodash';

export interface State {
  [key: string]: Recipe;
};

const initialState: State = {
};

export function reducer(state = initialState, action: recipesCollection.Actions): State {
  switch (action.type) {
    case recipesCollection.ADD_RECIPE: {
      const recipe: Recipe = action.payload;

      return Object.assign({}, state, { [ recipe.label ]: recipe })
    }

    case recipesCollection.REMOVE_RECIPE: {
      const recipe: Recipe = action.payload;
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy[recipe.label];

      return Object.assign({}, stateCopy)
    }

    default: {
      return state;
    }
  }
}


export const getRecipesCollection = (state: State) => state;
