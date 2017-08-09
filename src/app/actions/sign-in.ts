import { Action } from '@ngrx/store';
import { IUser } from './../models/user'

export const SIGN_IN =             '[SignedIn] User Sign In';
export const SIGN_IN_SUCCESS =     '[SignedIn] User Sign In Success';
export const SIGN_IN_FAIL =        '[SignedIn] User Sign In Fail';
export const SIGN_OUT =            '[SignedIn] User Sign Out';
export const SIGN_OUT_SUCCESS =    '[SignedIn] User Sign Out Success';
export const SIGN_OUT_FAIL =       '[SignedIn] User Sign Out Fail';

export class SignInAction implements Action {
  readonly type = SIGN_IN;
  constructor(public payload: IUser){}
}

export class SignInSuccessAction implements Action {
  readonly type = SIGN_IN_SUCCESS;
  constructor(){}
}

export class SignInFailAction implements Action {
  readonly type = SIGN_IN_FAIL;
  constructor(public payload){}
}

export class SignOutAction implements Action {
  readonly type = SIGN_OUT;
  constructor(){}
}

export class SignOutSuccessAction implements Action {
  readonly type = SIGN_OUT_SUCCESS;
  constructor(){}
}

export class SignOutFailAction implements Action {
  readonly type = SIGN_OUT_FAIL;
  constructor(public payload: any){}
}

export type Actions
    = SignInAction
    | SignInSuccessAction
    | SignInFailAction
    | SignOutAction
    | SignOutSuccessAction
    | SignOutFailAction;