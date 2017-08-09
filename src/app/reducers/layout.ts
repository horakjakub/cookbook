import * as layout from '../actions/layout';
import { IAlert } from '../models/alert';

export interface State {
  showSidenav: boolean;
  showAlert: boolean;
  alertInfo: IAlert
}

const initialState: State = {
  showSidenav: false,
  showAlert: false,
  alertInfo: { message: '', header: ''}
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

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getShowAlert = (state: State) => state.showAlert;
export const getAlertInfo = (state: State) => state.alertInfo;
