import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInPageComponent {
  loginVisible:boolean = true;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  emailRegEx: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private formBuilder: FormBuilder){
    this.createSignInForm();
    this.createSignUpForm();
  }

  toggleTab(){
    this.loginVisible = this.loginVisible ? false : true;
    this.signInForm.reset();
    this.signUpForm.reset();
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

  signInSubmit() {
    debugger;
  }

  signUpSubmit(){
    debugger;
  }
}

