import { User } from 'src/app/models/user.model';

export abstract class IUserService {
  abstract setUser(user: User): void;

  abstract getUser(): User | null;

  abstract removeUser(): void;
}
