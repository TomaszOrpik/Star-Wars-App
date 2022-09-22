import { TestBed } from '@angular/core/testing';
import { createMockUser } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { AuthServiceMock } from '../../services/auth/auth.service.mock';
import { UserService } from '../../services/user/user.service';
import { UserServiceMock } from '../../services/user/user.service.mock';
import { createMockString } from '../../utils/string.utils';
import { AuthFacade, AuthState } from './auth.facade';

describe('Auth Facade', () => {
  let facade: AuthFacade;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
      ],
    });
    facade = TestBed.inject(AuthFacade);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
  });

  it('should be defined', () => expect(facade).toBeDefined());

  it('should get user', () => {
    const mockUser = createMockUser();
    userService.getUser = jest.fn().mockReturnValueOnce(mockUser);

    const result = facade.getUser();

    expect(userService.getUser).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });

  it('should signIn', async () => {
    const mockEmail = createMockString();
    const mockPassword = createMockString();
    const mockUser = createMockUser({
      email: mockEmail,
    });
    authService.signIn = jest.fn().mockResolvedValueOnce(mockUser);
    userService.setUser = jest.fn();

    const result = await facade.signIn(mockEmail, mockPassword);

    expect(authService.signIn).toHaveBeenCalledTimes(1);
    expect(authService.signIn).toHaveBeenCalledWith(mockEmail, mockPassword);
    expect(userService.setUser).toHaveBeenCalledTimes(1);
    expect(userService.setUser).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(AuthState.LoginSuccessfully);
  });

  it('should signUp', async () => {
    const mockEmail = createMockString();
    const mockPassword = createMockString();
    const mockUser = createMockUser({
      email: mockEmail,
    });
    authService.signUp = jest.fn().mockResolvedValueOnce(mockUser);

    const result = await facade.signUp(mockEmail, mockPassword);

    expect(authService.signUp).toHaveBeenCalledTimes(1);
    expect(authService.signUp).toHaveBeenCalledWith(mockEmail, mockPassword);
    expect(result).toEqual(AuthState.UserCreatedSuccessfully);
  });

  it('should loginWithGoogle', async () => {
    const mockUser = createMockUser();
    authService.loginWithGoogle = jest.fn().mockResolvedValueOnce(mockUser);
    userService.setUser = jest.fn();

    const result = await facade.loginWithGoogle();

    expect(authService.loginWithGoogle).toHaveBeenCalledTimes(1);
    expect(userService.setUser).toHaveBeenCalledTimes(1);
    expect(userService.setUser).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(AuthState.LoginSuccessfully);
  });

  it('should signOut', async () => {
    authService.signOut = jest.fn();
    userService.removeUser = jest.fn();

    await facade.signOut();

    expect(authService.signOut).toHaveBeenCalledTimes(1);
    expect(userService.removeUser).toHaveBeenCalledTimes(1);
  });
});
