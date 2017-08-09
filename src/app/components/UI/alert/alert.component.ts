import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { HideAlertAction } from '../../../actions/layout';
import { Observable } from 'rxjs/Observable';
import { IAlert } from '../../../models/alert';

@Component({
        selector: 'alert',
        templateUrl: './alert.component.html',
        styleUrls: ['./alert.component.css']
})

export class AlertComponent {
    alertVisible$: Observable<Boolean>;
    alertMessage: string = '';
    alertHeader: string = '';

    constructor(private store: Store<fromRoot.State>) {
        this.alertVisible$ = this.store.select(fromRoot.getShowAlert);
        this.store.select(fromRoot.getLayoutState).subscribe((val)=>{
            if(val.showAlert === false){
                this.delayComponentPropertyValueChanging('alertMessage', val.alertInfo.message, 400);
                this.delayComponentPropertyValueChanging('alertHeader',  val.alertInfo.message, 400);
            } else {
                this.alertMessage = val.alertInfo.message;
                this.alertHeader = val.alertInfo.header;
            }
        });
    }

    delayComponentPropertyValueChanging(propertyToChange: string, newValue: string, delay: number): void {
        const componentRef = this;
        setTimeout(()=>{
            componentRef[propertyToChange] = newValue;
        }, delay)
    }

    closeAlert(event): void {
        if(event.target.className.indexOf('alert__button') > -1 ||
            event.target.className.indexOf('alert__background') > -1){
            this.store.dispatch(new HideAlertAction());
        }
    }
}
