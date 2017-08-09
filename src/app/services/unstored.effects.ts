/**
 * Created by jhorak on 09.08.2017.
 */
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import * as activationToken from '../actions/activation-token';
import * as fromRoot from '../reducers';


import {SIGN_IN_SUCCESS} from "../actions/sign-in";

@Injectable()

export class UnstoredEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>
    ){
    }

    @Effect() tokenActivated$ = this.actions$
        .ofType(activationToken.ACTIVATE_TOKEN_SUCCESS)
}