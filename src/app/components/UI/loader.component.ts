import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../reducers';
import * as layout from './../../actions/layout';
import { Observable } from 'rxjs/Observable';

@Component({
        selector: 'loader',
        templateUrl: './loader.component.html',
        styleUrls: ['./loader.component.css']
})

export class LoaderComponent {
  loaderVisible$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {
    this.loaderVisible$ = this.store.select(fromRoot.getSearchLoading);
  }
}
