import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IUser } from './../../../models/user';
import { SignInAction, SIGN_IN, SIGN_IN_SUCCESS } from './../../../actions/sign-in';
import { SignUpAction } from './../../../actions/sign-up';
import { ShowAlertAction } from './../../../actions/layout';
import * as fromRoot from '../../../reducers';
import { Observable } from 'rxjs/Observable';



@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInPageComponent {
  loginVisible:boolean = true;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  signInValidationInfo: string;
  emailRegEx: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  signInError$: Observable<any>;
  signUpValue$: Observable<any>;

  constructor(private formBuilder: FormBuilder, private store: Store<fromRoot.State>, private actions$: Actions){
    this.createSignInForm();
    this.createSignUpForm();

    this.signInError$ = this.store.select(fromRoot.getSignInMessageStatus).skip(1);
    this.signInError$.subscribe((val)=>{ this.signInErrorMessagesFactory(val)});


    this.signUpValue$ = this.store.select(fromRoot.getSignedUpState).skip(1);
    this.signUpValue$.subscribe((val)=>{
      if(val.errorOccurred){
        this.signUpErrorMessagesFactory(val.statusMessage);
      } else {
        this.showMessageWithSuccessfulSigningUp();
      }
    });
  }

  toggleTab(){
    this.loginVisible = this.loginVisible ? false : true;
    this.signInForm.reset();
    this.signUpForm.reset();
    this.signInValidationInfo = '';
  }

  createSignInForm(){
    this.signInForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.pattern(this.emailRegEx)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  createSignUpForm(){
    this.signUpForm = this.formBuilder.group({
      username: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      email: ['', [ Validators.required, Validators.pattern(this.emailRegEx)]],
      password: ['', [ Validators.required, Validators.minLength(6), Validators.pattern(/[0-9]/i)]],
      passwordRetyped: ['', [ Validators.required, Validators.minLength(6), Validators.pattern(/[0-9]/i)]]
    });
  }

  passwordsMatchedOrUnfilled(): boolean {
    let passwordsMatched: boolean = true;
    if(this.signUpForm !== undefined){
      let password = this.signUpForm.get('password').value;
      let passwordRetyped = this.signUpForm.get('passwordRetyped').value;

      if((password !== null && passwordRetyped !== null) && (password !== passwordRetyped)){
        passwordsMatched = false;
      }
    }
    return passwordsMatched;
  }

  passwordsMatched(): boolean {
    let passwordsMatched: boolean = false;
    if(this.signUpForm !== undefined){
      let password = this.signUpForm.get('password').value;
      let passwordRetyped = this.signUpForm.get('passwordRetyped').value;

      if((password !== null && passwordRetyped !== null) && password === passwordRetyped){
        passwordsMatched = true;
      }
    }
    return passwordsMatched;
  }

  showMessageWithSuccessfulSigningUp(){
    this.store.dispatch(new ShowAlertAction({
      header: 'Signing up finished successfully',
      message: 'Please go to your email account, and confirm address.'
    }));

    this.toggleTab();
  }

  signInSubmit() {
    const signInUserData: IUser = {
      username: '',
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    };

    this.store.dispatch(new SignInAction(signInUserData));
  }

  signUpSubmit(){
    const signUpUserData: IUser = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };

    this.store.dispatch(new SignUpAction(signUpUserData));
  }

  signInErrorMessagesFactory(error: any){
    if(error.status === 401){
      this.signInValidationInfo = 'Provided email or password is incorrect.';
    } else if(error.status === 406){
      this.signInValidationInfo = 'User has unactive account. Please go to your email and confirm it.';
    }
  }

  signUpErrorMessagesFactory(error: any){
  }
}

