import { Reducer, Action } from '@ngrx/store';
import { Meal } from '../models/meal';

export const mealsReducer = (state: Array<Meal>, action: Action): Array<Meal> => {
  switch(action.type){
      case 'ADD_MEAL':
          let newState = state.slice();
          newState.push(action.payload);
          return newState;
      case 'REMOVE_MEAL':
          return [];
      default:
          return state;
  }
}
