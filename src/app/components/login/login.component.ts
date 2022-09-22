import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade, AuthState } from '../../facades/auth/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('email') email?: ElementRef;
  @ViewChild('password') password?: ElementRef;
  @ViewChild('submitBtn') submitBtn?: ElementRef;

  isSignIn = true;
  emailTouched = false;
  passwordTouched = false;
  isFormSendSuccess = false;
  emailError = '';
  passwordError = '';
  formError = '';

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  async submit(e: Event) {
    e.preventDefault();
    const email = this.email?.nativeElement.value;
    const password = this.password?.nativeElement.value;
    if (this.isSignIn) {
      const authState = await this.authFacade.signIn(email, password);
      if (authState === AuthState.LoginSuccessfully) {
        this.router.navigate(['/']);
      } else {
        this.formError = 'incorrect Password or Email';
        this.isFormSendSuccess = false;
      }
    } else {
      const authState = await this.authFacade.signUp(email, password);
      if (authState === AuthState.UserCreatedSuccessfully) {
        this.formError = 'User Created Successfully';
        this.isFormSendSuccess = true;
      } else {
        this.formError = 'User creation failed';
        this.isFormSendSuccess = false;
      }
    }
  }

  emailKeyUp() {
    this.emailTouched = true;
    const email = this.email?.nativeElement;
    if (email.value.length === 0) {
      this.emailError = 'Email field cannot be empty';
      this.renderer.removeClass(email, 'is-valid');
      this.renderer.addClass(email, 'is-invalid');
    } else if (
      !email.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      this.emailError = 'Incorrect email format';
      this.renderer.removeClass(email, 'is-valid');
      this.renderer.addClass(email, 'is-invalid');
    } else {
      this.emailError = '';
      this.renderer.removeClass(email, 'is-invalid');
      this.renderer.addClass(email, 'is-valid');
    }
    this.validateForm();
  }

  passwordKeyUp() {
    this.passwordTouched = true;
    const password = this.password?.nativeElement;
    if (password.value.length === 0) {
      this.passwordError = 'Password field cannot be empty';
      this.renderer.removeClass(password, 'is-valid');
      this.renderer.addClass(password, 'is-invalid');
    } else if (password.value.length < 6) {
      this.passwordError = 'Password must be at least 6 digits long';
      this.renderer.removeClass(password, 'is-valid');
      this.renderer.addClass(password, 'is-invalid');
    } else {
      this.passwordError = '';
      this.renderer.removeClass(password, 'is-invalid');
      this.renderer.addClass(password, 'is-valid');
    }
    this.validateForm();
  }

  switchSignMethod() {
    this.isSignIn = !this.isSignIn;
  }

  async loginWithGoogle() {
    const authState = await this.authFacade.loginWithGoogle();
    if (authState === AuthState.LoginSuccessfully) {
      this.router.navigate(['/']);
    } else {
      this.formError = 'Login Failed';
      this.isFormSendSuccess = false;
    }
  }

  private validateForm() {
    const submitBtn = this.submitBtn?.nativeElement;
    if (
      this.emailError === '' &&
      this.passwordError === '' &&
      this.emailTouched &&
      this.passwordTouched
    ) {
      this.renderer.removeClass(submitBtn, 'disabled');
    } else {
      this.renderer.addClass(submitBtn, 'disabled');
    }
  }
}
