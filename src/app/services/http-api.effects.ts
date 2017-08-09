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
import * as _ from 'lodash';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as search from '../actions/search';
import * as signIn from '../actions/sign-in';
import * as signUp from '../actions/sign-up';
import * as errorLog from '../actions/error';
import * as activationToken from '../actions/activation-token';
import * as serverConnection from '../actions/server-connection';
import * as recipesCollection from '../actions/recipes-collection';
import * as fromRoot from '../reducers';

import { JsonpRequestService } from './jsonp-request.service';
import { NodeCookbookRequestsFactory } from './node-cookbook-requests.factory';
import { IRecipe } from './../models/recipe';
import { IUser } from './../models/user';

import {SIGN_IN_SUCCESS} from "../actions/sign-in";

@Injectable()

export class HttpApiEffectsService {
    currentRecipesCollection;

    get credentials(): string{
        return sessionStorage.getItem('sessionData');
    }

    set credentials(phrase){
        sessionStorage.setItem('sessionData', phrase);
    }

    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private jsonpRequestService: JsonpRequestService,
        private requestService: NodeCookbookRequestsFactory
    ){
        this.store.select(fromRoot.getRecipesCollection).subscribe((recipesCollection)=>{
            this.currentRecipesCollection = recipesCollection;
        })
    }

    @Effect() search$: Observable<Action> = this.actions$
        .ofType(search.SEARCH)
        .map(toPayload)
        .switchMap(query => {
            if (query === '') {
                return empty();
            }

            const nextSearch$ = this.actions$.ofType(search.SEARCH).skip(1);

            return this.jsonpRequestService.basicRequest(query)
                .takeUntil(nextSearch$)
                .map(recipes => {return new search.SearchCompleteAction(recipes)})
                .catch(() => of(new search.SearchCompleteAction([])));
        });

    @Effect() checkIsNodeCookbookConnectivity$: Observable<Action> = this.actions$
        .ofType(serverConnection.SERVER_CONNECTION_CHECK)
        .map(toPayload)
        .switchMap(()=>{
            return this.requestService.get('hello')
                .map(() => {return new serverConnection.ServerConnectionCheckSuccessAction()})
                .catch(() => of(new serverConnection.ServerConnectionCheckFailAction()));
        });

    @Effect() activateToken$: Observable<Action> = this.actions$
        .ofType(activationToken.ACTIVATE_TOKEN)
        .map(toPayload)
        .switchMap(token => {
            if (token === '') {
                return empty();
            }

            return this.requestService.get('activation-token', { params: { token: token }})
                .map(() => {return new activationToken.ActivateTokensSuccessAction()})
                .catch((err) => of(new errorLog.AddErrorToLogAction({ type: 'Activatation Token Error', timestamp: Date.now(), errorObject: err})));
        });

    @Effect() signIn$: Observable<Action> = this.actions$
        .ofType(signIn.SIGN_IN)
        .map(toPayload)
        .switchMap((userData: IUser)=> {
            const nextLogin$ = this.actions$.ofType(signIn.SIGN_IN).skip(1);
            let credentials = "Basic " + btoa(userData.email + ":" + userData.password);

            return this.requestService.get('login', { headers: { Authorization: credentials }})
                .takeUntil(nextLogin$)
                .map(()=>{
                    this.credentials = credentials;
                    return new signIn.SignInSuccessAction()
                    }
                )
                .catch((error) => { return of(new signIn.SignInFailAction(error))});
        });


    @Effect() createUser$: Observable<Action> = this.actions$
        .ofType(signUp.SIGN_UP)
        .map(toPayload)
        .switchMap((userData: IUser)=> {
            const nextSignUp$ = this.actions$.ofType(signUp.SIGN_UP).skip(1);
            return this.requestService.put('user', userData)
                .takeUntil(nextSignUp$)
                .map(()=> new signUp.SignUpSuccessAction())
                .catch((error) => { return of(new signUp.SignUpFailAction(error))});
        });

    @Effect() saveCollection$: Observable<Action> = this.actions$
        .ofType(recipesCollection.ADD_RECIPE, recipesCollection.REMOVE_RECIPE)
        .map(toPayload)
        .switchMap((recipe: IRecipe)=> {
            this.store.dispatch(new recipesCollection.SynchroniseRecipesCollectionAction());
            const currentRecipesCollection = this.currentRecipesCollection;
            const nextCollectionChange$ = this.actions$.ofType(recipesCollection.ADD_RECIPE, recipesCollection.REMOVE_RECIPE).skip(1);
            let credentials = this.credentials || '';

            return this.requestService.post('recipesCollection', currentRecipesCollection, { headers: { Authorization: credentials }})
                .takeUntil(nextCollectionChange$)
                .map(()=>{
                    return new recipesCollection.SynchroniseRecipesCollectionSuccessAction()
                })
                .catch((error) => {
                    this.store.dispatch(new recipesCollection.SynchroniseRecipesCollectionFailAction());
                    return of((new errorLog.AddErrorToLogAction({ type: 'Recipes Collection Synchronisation Error', timestamp: Date.now(), errorObject: error})));
                });
        });


    @Effect() getRecipesCollection$: Observable<Action> = this.actions$
        .ofType(SIGN_IN_SUCCESS)
        .map(toPayload)
        .switchMap(()=>{
            let credentials = this.credentials || '';
            return this.requestService.get('recipesCollection', { headers: { Authorization: credentials }})
                .map((loadedRecipesCollection: IRecipe[])=>{
                    this.store.dispatch(new recipesCollection.MergeCollectionsAction(loadedRecipesCollection))
                    return new recipesCollection.SynchroniseRecipesCollectionSuccessAction()
                })
                .catch((error) => {
                    this.store.dispatch(new recipesCollection.SynchroniseRecipesCollectionFailAction());
                    return of((new errorLog.AddErrorToLogAction({ type: 'Recipes Collection Synchronisation Error', timestamp: Date.now(), errorObject: error})));
                });
        });
}
