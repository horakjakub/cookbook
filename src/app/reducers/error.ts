import * as error from '../actions/error';
import { IInternalError } from '../models/error';

const initialState: IInternalError[] = [];

export function reducer(state = initialState, action: error.Actions): IInternalError[] {
  switch (action.type) {
      case error.ERROR_OCCURRED: {
      const newState: IInternalError[] = state.slice();
      newState.push(action.payload);
      return newState;
    }

    default:
      return state;
  }
}

