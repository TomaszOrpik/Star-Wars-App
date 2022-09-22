import { of } from 'rxjs';
import { User } from '../../models/user.model';
import { IAuthService } from './auth.service.interface';

export class AuthServiceMock implements IAuthService {
  authState = of(null);

  public signUp = (_email: string, _password: string): Promise<User | null> =>
    new Promise(() => null);

  public signIn = (_email: string, _password: string): Promise<User | null> =>
    new Promise(() => null);

  public loginWithGoogle = (): Promise<User | null> => new Promise(() => null);

  public signOut = (): Promise<void> =>
    new Promise(() => {
      return;
    });
}
