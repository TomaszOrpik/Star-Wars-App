import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade } from '../../facades/auth/auth.facade';
import { AuthFacadeMock } from '../../facades/auth/auth.facade.mock';
import { createMockUser } from '../../models/user.model';
import { AuthGuard } from './auth.guard';

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let authFacade: AuthFacade;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthFacade,
          useClass: AuthFacadeMock,
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    authFacade = TestBed.inject(AuthFacade);
    router = TestBed.inject(Router);
  });

  it('should be defined', () => expect(guard).toBeDefined());

  it('should return true if user exist', () => {
    const mockUser = createMockUser();
    authFacade.getUser = jest.fn().mockReturnValueOnce(mockUser);

    const result = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(authFacade.getUser).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it('should redirect when user does not exist', () => {
    authFacade.getUser = jest.fn().mockReturnValueOnce(null);
    router.navigate = jest.fn();

    const result = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );
    expect(authFacade.getUser).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
