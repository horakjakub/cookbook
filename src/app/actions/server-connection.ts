/**
 * Created by jhorak on 08.08.2017.
 */
import { Action } from '@ngrx/store';

export const SERVER_CONNECTION_CHECK = '[Server Connection] Server Connection check started';
export const SERVER_CONNECTION_CHECK_SUCCESS = '[Server Connection] Server Connection established';
export const SERVER_CONNECTION_CHECK_FAIL = '[Server Connection] Server Connection unavailable';

export class ServerConnectionCheckAction implements Action {
    readonly type = SERVER_CONNECTION_CHECK;
}
export class ServerConnectionCheckSuccessAction implements Action {
    readonly type = SERVER_CONNECTION_CHECK_SUCCESS;
}
export class ServerConnectionCheckFailAction implements Action {
    readonly type = SERVER_CONNECTION_CHECK_FAIL;
}
export type Actions
    = ServerConnectionCheckAction
    | ServerConnectionCheckSuccessAction
    | ServerConnectionCheckFailAction;