import { Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade, AuthState } from '../../facades/auth/auth.facade';
import { AuthFacadeMock } from '../../facades/auth/auth.facade.mock';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacade: AuthFacade;
  let router: Router;
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthFacade,
          useClass: AuthFacadeMock,
        },
      ],
    }).compileComponents();
    authFacade = TestBed.inject(AuthFacade);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    renderer = fixture.componentRef.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user', async () => {
    component.isSignIn = true;
    authFacade.signIn = jest
      .fn()
      .mockResolvedValueOnce(AuthState.LoginSuccessfully);
    router.navigate = jest.fn();

    await component.submit({
      preventDefault: () => {},
    } as Event);

    expect(authFacade.signIn).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should register user', async () => {
    component.isSignIn = false;
    authFacade.signUp = jest
      .fn()
      .mockResolvedValueOnce(AuthState.UserCreatedSuccessfully);

    await component.submit({
      preventDefault: () => {},
    } as Event);

    expect(authFacade.signUp).toHaveBeenCalledTimes(1);
    expect(component.formError).toEqual('User Created Successfully');
    expect(component.isFormSendSuccess).toEqual(true);
  });

  it('should validate email on key up', () => {
    renderer.addClass = jest.fn();
    renderer.removeClass = jest.fn();

    component.emailKeyUp();

    expect(component.emailTouched).toEqual(true);
    expect(component.emailError).toEqual('Email field cannot be empty');
    expect(renderer.removeClass).toHaveBeenCalledWith(
      component.email?.nativeElement,
      'is-valid'
    );
    expect(renderer.addClass).toHaveBeenCalledWith(
      component.email?.nativeElement,
      'is-invalid'
    );
    expect(renderer.addClass).toHaveBeenCalledWith(
      component.submitBtn?.nativeElement,
      'disabled'
    );
    expect(renderer.removeClass).toHaveBeenCalledTimes(1);
    expect(renderer.addClass).toHaveBeenCalledTimes(2);
  });

  it('should validate password on key up', () => {
    renderer.addClass = jest.fn();
    renderer.removeClass = jest.fn();

    component.passwordKeyUp();

    expect(component.passwordTouched).toEqual(true);
    expect(component.passwordError).toEqual('Password field cannot be empty');
    expect(renderer.removeClass).toHaveBeenCalledWith(
      component.password?.nativeElement,
      'is-valid'
    );
    expect(renderer.addClass).toHaveBeenCalledWith(
      component.password?.nativeElement,
      'is-invalid'
    );
    expect(renderer.addClass).toHaveBeenCalledWith(
      component.submitBtn?.nativeElement,
      'disabled'
    );
    expect(renderer.removeClass).toHaveBeenCalledTimes(1);
    expect(renderer.addClass).toHaveBeenCalledTimes(2);
  });

  it('should switch sign method', () => {
    component.isSignIn = true;

    component.switchSignMethod();

    expect(component.isSignIn).toEqual(false);
  });

  it('should login user with google account', async () => {
    authFacade.loginWithGoogle = jest
      .fn()
      .mockResolvedValueOnce(AuthState.LoginSuccessfully);
    router.navigate = jest.fn();

    await component.loginWithGoogle();

    expect(authFacade.loginWithGoogle).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
