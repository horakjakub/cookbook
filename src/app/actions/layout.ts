import { Action } from '@ngrx/store';
import { IAlert } from '../models/alert'
import { IConfirm } from '../models/confirm'

export const OPEN_SIDENAV =   '[Layout] Open Sidenav';
export const CLOSE_SIDENAV =  '[Layout] Close Sidenav';
export const SHOW_ALERT =     '[Layout] Show Alert';
export const HIDE_ALERT =     '[Layout] Hide Alert';
export const SHOW_CONFIRM =     '[Layout] Show Confirm';
export const HIDE_CONFIRM =     '[Layout] Hide Confirm';
export const SIZE_CHANGE =     '[Layout] Size Change';

export class OpenSidenavAction implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class ShowAlertAction implements Action {
  readonly type = SHOW_ALERT;
  constructor(public payload: IAlert){
  }
}

export class HideAlertAction implements Action {
  readonly type = HIDE_ALERT;
}

export class ShowConfirmAction implements Action {
  readonly type = SHOW_CONFIRM;
  constructor(public payload: IConfirm){
  }
}

export class HideConfirmAction implements Action {
  readonly type = HIDE_CONFIRM;
}

export class SizeChangeAction implements Action {
  readonly type = SIZE_CHANGE;
  constructor(public payload:number){
  }
}

export type Actions
  = OpenSidenavAction
  | CloseSidenavAction
  | ShowAlertAction
  | HideAlertAction
  | ShowConfirmAction
  | HideConfirmAction
  | SizeChangeAction;
