import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  setUser(user: User): void {
    const stringUser = JSON.stringify(user);
    localStorage.setItem('user', stringUser);
  }
  getUser(): User | null {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    else return null;
  }
  removeUser(): void {
    localStorage.removeItem('user');
  }
}
