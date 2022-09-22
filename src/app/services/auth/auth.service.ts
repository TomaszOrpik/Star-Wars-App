import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { User } from '../../models/user.model';
import { IAuthService } from './auth.service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  authState = this.afAuth.authState;

  constructor(public afAuth: AngularFireAuth) {}

  public async signUp(email: string, password: string): Promise<User | null> {
    const result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (result.user) {
      return new User({
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
      });
    } else return null;
  }
  public async signIn(email: string, password: string): Promise<User | null> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        return new User({
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
        });
      } else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async loginWithGoogle(): Promise<User | null> {
    const res = await this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider()
    );
    if (res.user) {
      return new User({
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
      });
    } else return null;
  }

  public async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }
}
