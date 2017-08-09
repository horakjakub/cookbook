/**
 * Created by jhorak on 09.08.2017.
 */
import * as serverConnection from '../actions/server-connection';

const initialState: boolean = true;

export function reducer(state = initialState, action: serverConnection.Actions): boolean {
    switch (action.type) {
        case serverConnection.SERVER_CONNECTION_CHECK_SUCCESS: {
            const newState = true;
            return newState;
        }
        case serverConnection.SERVER_CONNECTION_CHECK_FAIL: {
            const newState = false;
            return newState;
        }
        default:
            return state;
    }
}

