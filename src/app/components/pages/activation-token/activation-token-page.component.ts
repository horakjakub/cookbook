import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers'
import { go } from '@ngrx/router-store';
import * as activationToken from '../../../actions/activation-token';
import { UnstoredEffects } from '../../../services/unstored.effects'


@Component({
  templateUrl: './activation-token-page.component.html',
  styleUrls: ['./activation-token-page.component.css']
})

export class ActivationTokenPageComponent {
  serverOnline: boolean = true;
  tokenActivated: boolean = false;
  private _activationToken: string;

  constructor(
      private store: Store<fromRoot.State>,
      private route: ActivatedRoute,
      private unstoredEffects: UnstoredEffects
  ){
    this.store.select(fromRoot.getServerOnlineState).skip(1).subscribe((serverOnlineStatus) =>{
      this.serverOnline = serverOnlineStatus;
      if(!this.serverOnline){
        this.store.dispatch(go('search'))
      }
    });

    this.route.queryParams.subscribe(params => {
      this._activationToken = params['token'];
      this.store.dispatch(new activationToken.ActivateTokenAction(this._activationToken));
    });

    this.unstoredEffects.tokenActivated$.subscribe(()=>{
      this.tokenActivated = true;
    })
  }

  goToSignIn(){
    this.store.dispatch(go('sign-in'))
  }
}
