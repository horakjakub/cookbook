import * as search from '../actions/search';
import { IRecipe } from '../models/recipe';

export interface State {
  recipes: IRecipe[];
};

const initialState: State = {
  recipes: [],
};

export function reducer(state = initialState, action: search.Actions): State {
  switch (action.type) {
     case search.SEARCH_COMPLETE: {
      const recipes = action.payload;

      return {
        recipes: recipes,
      };
    }

    default: {
      return state;
    }
  }
}


export const getRecipes = (state: State) => state.recipes;
