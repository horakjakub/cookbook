/**
 * Created by jhorak on 03.08.2017.
 */
import * as signUp from '../actions/sign-up';

export interface State {
    errorOccurred: boolean;
    statusMessage: any;
}

const initialState: State = {
    errorOccurred: false,
    statusMessage: {}
};

export function reducer(state = initialState, action: signUp.Actions): State {
    switch (action.type) {
        case signUp.SIGN_UP_SUCCESS: {
            const newState:State = Object.assign({}, state);
            newState.errorOccurred = false;
            newState.statusMessage = {};
            return newState;
        }

        case signUp.SIGN_UP_FAIL: {
            const newState:State = Object.assign({}, state);
            newState.errorOccurred = true;
            newState.statusMessage = action.payload;
            return newState;
        }

        default: {
            return state;
        }
    }
}

export const getSignUpErrorMessage = (state: State) => state.statusMessage;getSignUpErrorMessage