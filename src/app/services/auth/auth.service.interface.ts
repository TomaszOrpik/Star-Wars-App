import { User } from 'src/app/models/user.model';

export abstract class IAuthService {
  public abstract signUp(email: string, password: string): Promise<User | null>;

  public abstract signIn(email: string, password: string): Promise<User | null>;

  public abstract loginWithGoogle(): Promise<User | null>;

  public abstract signOut(): Promise<void>;
}
