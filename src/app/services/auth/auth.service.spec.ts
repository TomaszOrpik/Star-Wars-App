import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { User } from '../../models/user.model';
import { createMockString } from '../../utils/string.utils';
import { AuthService } from './auth.service';

describe('Auth Service', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: AngularFireAuth,
          useValue: {
            authState: of(null),
            createUserWithEmailAndPassword: () => new Promise(() => {}),
            signInWithEmailAndPassword: () => new Promise(() => {}),
            signInWithPopup: () => new Promise(() => {}),
            signOut: () => new Promise(() => {}),
          },
        },
      ],
    });
    service = TestBed.inject(AuthService);
    afAuth = TestBed.inject(AngularFireAuth);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should sign up', async () => {
    const mockEmail = createMockString();
    const mockPassword = createMockString();
    const mockUser = new User({
      uid: createMockString(),
      displayName: createMockString(),
      email: mockEmail,
    });
    afAuth.createUserWithEmailAndPassword = jest
      .fn()
      .mockResolvedValueOnce({ user: mockUser });

    const result = await service.signUp(mockEmail, mockPassword);

    expect(result).toEqual(mockUser);
    expect(afAuth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(afAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      mockEmail,
      mockPassword
    );
  });

  it('should sign in', async () => {
    const mockEmail = createMockString();
    const mockPassword = createMockString();
    const mockUser = new User({
      uid: createMockString(),
      displayName: createMockString(),
      email: mockEmail,
    });
    afAuth.signInWithEmailAndPassword = jest
      .fn()
      .mockResolvedValueOnce({ user: mockUser });

    const result = await service.signIn(mockEmail, mockPassword);

    expect(result).toEqual(mockUser);
    expect(afAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(afAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      mockEmail,
      mockPassword
    );
  });

  it('should loginWithGoogle', async () => {
    const mockUser = new User({
      uid: createMockString(),
      displayName: createMockString(),
      email: createMockString(),
    });
    afAuth.signInWithPopup = jest
      .fn()
      .mockResolvedValueOnce({ user: mockUser });

    const result = await service.loginWithGoogle();

    expect(result).toEqual(mockUser);
    expect(afAuth.signInWithPopup).toHaveBeenCalledTimes(1);
  });

  it('should sign out', async () => {
    afAuth.signOut = jest.fn();

    await service.signOut();

    expect(afAuth.signOut).toHaveBeenCalledTimes(1);
  });
});
