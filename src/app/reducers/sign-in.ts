/**
 * Created by jhorak on 03.08.2017.
 */
import * as signIn from '../actions/sign-in';

export interface State {
    signedIn: boolean;
    errorOccurred: boolean;
    statusMessage: any;
};

const initialState: State = {
    signedIn: false,
    errorOccurred: false,
    statusMessage: {}
};

export function reducer(state = initialState, action: signIn.Actions): State {
    switch (action.type) {
        case signIn.SIGN_IN_SUCCESS: {
            const newState:State = Object.assign({}, state);
            newState.signedIn = true;
            newState.errorOccurred = false;
            newState.statusMessage = {};
            return newState;
        }

        case signIn.SIGN_IN_FAIL: {
            const newState:State = Object.assign({}, state);
            newState.signedIn = false;
            newState.errorOccurred = true;
            newState.statusMessage = action.payload;
            return newState;
        }

        case signIn.SIGN_OUT_SUCCESS: {
            const newState:State = Object.assign({}, state);
            newState.signedIn = false;
            return newState;
        }

        case signIn.SIGN_OUT_FAIL: {
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

export const getSignInStatus = (state: State) => state.signedIn;
export const getSignInErrorMessage = (state: State) => state.statusMessage;