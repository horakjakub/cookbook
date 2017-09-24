import * as layout from '../actions/layout';
import { IAlert } from '../models/alert';
import { IConfirm } from '../models/confirm';

export interface State {
  showSidenav: boolean;
  showAlert: boolean;
  alertInfo: IAlert;
  showConfirm: boolean;
  confirmInfo: IConfirm;
  size: number;
}

const initialState: State = {
  showSidenav: false,
  showAlert: false,
  alertInfo: { message: '', header: ''},
  showConfirm: false,
  confirmInfo: { message: '', header: '', onConfirm: function(): void {} },
  size: 10
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
      case layout.CLOSE_SIDENAV: {
      const newState: State = Object.assign({}, state);
      newState.showSidenav = false;
      return newState;
    }

    case layout.OPEN_SIDENAV: {
      const newState: State = Object.assign({}, state);
      newState.showSidenav = true;
      return newState;
    }

    case layout.SHOW_ALERT: {
      const newState: State = Object.assign({}, state);
      newState.showAlert = true;
      newState.alertInfo = {};
      newState.alertInfo.header = action.payload.header || '';
      newState.alertInfo.message = action.payload.message || '';

      return newState;
    }

    case layout.HIDE_ALERT: {
      const newState: State = Object.assign({}, state);
      newState.showAlert = false;
      newState.alertInfo = { message: '', header: ''};
      return newState;
    }

    case layout.SHOW_CONFIRM: {
      const newState: State = Object.assign({}, state);
      newState.showConfirm = true;
      newState.confirmInfo = {};
      newState.confirmInfo.header = action.payload.header || '';
      newState.confirmInfo.message = action.payload.message || '';
      newState.confirmInfo.onConfirm = action.payload.onConfirm || function(){};
      return newState;
    }

    case layout.HIDE_CONFIRM: {
      const newState: State = Object.assign({}, state);
      newState.showConfirm = false;
      newState.confirmInfo = {};

      return newState;
    }

    case layout.SIZE_CHANGE: {
      const newState: State = Object.assign({}, state);
      newState.size = action.payload;

      return newState;
    }


    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getShowAlert = (state: State) => state.showAlert;
export const getAlertInfo = (state: State) => state.alertInfo;
export const getShowConfirm = (state: State) => state.showConfirm;
export const getConfirmInfo = (state: State) => state.confirmInfo;
export const getSize = (state: State) => state.size;
