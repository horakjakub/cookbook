import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

// ------------------- // state managing // -------------------- //
import * as fromRoot from '../reducers';
import { HttpApiEffectsService} from '../services/http-api.effects';

// ------------------- // actions // -------------------- //
import { ServerConnectionCheckAction } from '../actions/server-connection';
import { SignInSuccessAction } from '../actions/sign-in';
import { ShowConfirmAction } from '../actions/layout';

@Component({
  selector: 'body',
  host:     {'[style.fontSize]': 'bodyFontSize'},
  template: `
    <menu></menu>
    <router-outlet></router-outlet>
    <sidebar></sidebar>
    <loader></loader>
    <alert></alert>
    <confirm></confirm>
  `
})

export class AppComponent {
  bodyFontSize: string;

  constructor(
    private store: Store<fromRoot.State>,
    private httpApiEffectsService: HttpApiEffectsService
  ){
    // this.store.dispatch(new ServerConnectionCheckAction());
    // this.store.dispatch(new ShowConfirmAction({ header:'Please confirm', message: 'Tadam something', onConfirm: this.doSomething }));

    this.store.select(fromRoot.getSize).subscribe((size: number)=>{
      this.bodyFontSize = this.parseSizeFromNumberToPx(size);
    });
  }

  parseSizeFromNumberToPx(size: number): string {
    return size + 'px'
  }

  doSomething(): void {
    debugger;
  }

}
