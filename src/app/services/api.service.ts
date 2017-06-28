import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as search from '../actions/search';
import { JsonpRequestService } from './jsonp-request.service';
import { Recipe } from './../models/recipe';

@Injectable()

export class ApiService {
  constructor(
    private actions$: Actions,
    private jsonpRequestService: JsonpRequestService
  ){

  }

  basicSearchRequest(searchedProduct: string): Recipe[] {
    let searchResults: Recipe[];

    this.jsonpRequestService.basicRequest(searchedProduct).subscribe(results =>{ searchResults = searchResults });

    return searchResults;
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
}
