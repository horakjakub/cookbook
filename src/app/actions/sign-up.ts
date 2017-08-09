import { Action } from '@ngrx/store';
import { IUser } from './../models/user'

export const SIGN_UP =             '[SignUp] User Sign Up';
export const SIGN_UP_SUCCESS =     '[SignUp] User Sign Up Success';
export const SIGN_UP_FAIL =        '[SignUp] User Sign Up Fail';

export class SignUpAction implements Action {
  readonly type = SIGN_UP;
  constructor(public payload: IUser){}
}

export class SignUpSuccessAction implements Action {
  readonly type = SIGN_UP_SUCCESS;
  constructor(){}
}

export class SignUpFailAction implements Action {
  readonly type = SIGN_UP_FAIL;
  constructor(public payload: any){}
}

export type Actions
    = SignUpAction
    | SignUpSuccessAction
    | SignUpFailAction;