import { createMockUser } from '../../models/user.model';
import { UserService } from './user.service';

describe('User Service', () => {
  let service: UserService;
  beforeEach(() => {
    service = new UserService();
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should set user', () => {
    const mockUser = createMockUser();
    Storage.prototype.setItem = jest.fn();
    const stringifyUser = JSON.stringify(mockUser);

    service.setUser(mockUser);

    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'user',
      stringifyUser
    );
  });

  it('should get user', () => {
    const mockUser = createMockUser();
    Storage.prototype.getItem = jest
      .fn()
      .mockReturnValueOnce(JSON.stringify(mockUser));

    const result = service.getUser();

    expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('user');
    expect(result).toEqual(mockUser);
  });

  it('should remove user', () => {
    Storage.prototype.removeItem = jest.fn();

    service.removeUser();

    expect(Storage.prototype.removeItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('user');
  });
});
