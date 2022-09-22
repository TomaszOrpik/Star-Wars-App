import { User } from '../../models/user.model';
import { IUserService } from './user.service.interface';

export class UserServiceMock implements IUserService {
  setUser = (_user: User) => {};
  getUser = () => null;
  removeUser = () => {};
}
