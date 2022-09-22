import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { IAuthFacade } from './auth.facade.interface';

export enum AuthState {
  LoginSuccessfully,
  LoginFailed,
  UserCreatedSuccessfully,
  UserCreationFailed,
}

@Injectable({
  providedIn: 'root',
})
export class AuthFacade implements IAuthFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  getUser = () => this.userService.getUser();

  async signIn(email: string, password: string) {
    const user = await this.authService.signIn(email, password);
    if (user !== null) {
      this.userService.setUser(user);
      return AuthState.LoginSuccessfully;
    } else return AuthState.LoginFailed;
  }

  async signUp(email: string, password: string) {
    const user = await this.authService.signUp(email, password);
    if (user !== null) return AuthState.UserCreatedSuccessfully;
    else return AuthState.UserCreationFailed;
  }

  async loginWithGoogle() {
    const user = await this.authService.loginWithGoogle();
    if (user !== null) {
      this.userService.setUser(user);
      return AuthState.LoginSuccessfully;
    } else return AuthState.LoginFailed;
  }

  async signOut() {
    await this.authService.signOut();
    this.userService.removeUser();
  }
}
