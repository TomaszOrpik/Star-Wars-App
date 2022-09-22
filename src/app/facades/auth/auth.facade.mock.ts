import { createMockUser, User } from '../../models/user.model';
import { AuthState } from './auth.facade';
import { IAuthFacade } from './auth.facade.interface';

export class AuthFacadeMock implements IAuthFacade {
  getUser = () => createMockUser();

  signIn = (_email: string, _password: string): Promise<AuthState> =>
    new Promise(() => AuthState.LoginSuccessfully);

  signUp = (email: string, password: string): Promise<AuthState> =>
    new Promise(() => AuthState.UserCreatedSuccessfully);

  loginWithGoogle = (): Promise<AuthState> =>
    new Promise(() => AuthState.LoginSuccessfully);
  signOut = (): Promise<void> =>
    new Promise(() => {
      return;
    });
}
