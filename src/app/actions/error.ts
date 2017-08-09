/**
 * Created by jhorak on 08.08.2017.
 */

import { Action } from '@ngrx/store';
import { IInternalError } from '../models/error';

export const ERROR_OCCURRED = '[Error] Error occurred';

export class AddErrorToLogAction implements Action {
    readonly type = ERROR_OCCURRED;
    constructor(public payload: IInternalError){}
}

export type Actions
    = AddErrorToLogAction;

