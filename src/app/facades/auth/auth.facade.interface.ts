import { User } from '../../models/user.model';
import { AuthState } from './auth.facade';

export abstract class IAuthFacade {
  abstract getUser(): User | null;

  abstract signIn(email: string, password: string): Promise<AuthState>;

  abstract signUp(email: string, password: string): Promise<AuthState>;

  abstract loginWithGoogle(): Promise<AuthState>;

  abstract signOut(): Promise<void>;
}
