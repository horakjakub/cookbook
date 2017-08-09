/**
 * Created by jhorak on 09.08.2017.
 */

import { Action } from '@ngrx/store';

export const ACTIVATE_TOKEN = '[Activate Token] Activation started';
export const ACTIVATE_TOKEN_SUCCESS = '[Activate Token] Activation succeeded';

export class ActivateTokenAction implements Action {
    readonly type = ACTIVATE_TOKEN;
    constructor(public payload: string){
    }
}
export class ActivateTokensSuccessAction implements Action {
    readonly type = ACTIVATE_TOKEN_SUCCESS;
}

export type Actions
    = ActivateTokenAction
    | ActivateTokensSuccessAction;

