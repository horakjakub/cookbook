import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { HideConfirmAction } from '../../../actions/layout';
import { Observable } from 'rxjs/Observable';
import { IConfirm } from '../../../models/confirm';

@Component({
        selector: 'confirm',
        templateUrl: './confirm.component.html',
        styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent {
    confirmVisible$: Observable<Boolean>;
    confirmMessage: string = '';
    confirmHeader: string = '';
    onConfirmCb: any;

    constructor(private store: Store<fromRoot.State>) {
        this.confirmVisible$ = this.store.select(fromRoot.getShowConfirm);
        this.store.select(fromRoot.getLayoutState).subscribe((val)=>{
            if(val.showConfirm === false){
                this.delayComponentPropertyValueChanging('confirmMessage', val.confirmInfo.message, 400);
                this.delayComponentPropertyValueChanging('confirmHeader',  val.confirmInfo.message, 400);
            } else {
                this.confirmMessage = val.confirmInfo.message;
                this.confirmHeader = val.confirmInfo.header;
                this.onConfirmCb = val.confirmInfo.onConfirm;
            }
        });
    }
    onConfirm(){
        this.store.dispatch(new HideConfirmAction());
        this.onConfirmCb();
    }
    delayComponentPropertyValueChanging(propertyToChange: string, newValue: string, delay: number): void {
        const componentRef = this;
        setTimeout(()=>{
            componentRef[propertyToChange] = newValue;
        }, delay)
    }

    closeConfirm(event): void {
        if(event.target.className.indexOf('cancel__button') > -1 ||
            event.target.className.indexOf('confirm__background') > -1){
            this.store.dispatch(new HideConfirmAction());
        }
    }
}
