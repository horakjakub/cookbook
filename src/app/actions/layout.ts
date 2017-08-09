import { Action } from '@ngrx/store';
import { IAlert } from '../models/alert'

export const OPEN_SIDENAV =   '[Layout] Open Sidenav';
export const CLOSE_SIDENAV =  '[Layout] Close Sidenav';
export const SHOW_ALERT =     '[Layout] Show Alert';
export const HIDE_ALERT =     '[Layout] Hide Alert';

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

export type Actions
  = OpenSidenavAction
  | CloseSidenavAction
  | ShowAlertAction
  | HideAlertAction;
