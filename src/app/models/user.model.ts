import { createMockString } from '../utils/string.utils';

interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export class User implements IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  constructor(props: IUser) {
    this.uid = props.uid;
    this.email = props.email;
    this.displayName = props.displayName;
  }
}

export const createMockUser = (props?: Partial<IUser>): User =>
  new User({
    uid: createMockString(),
    email: createMockString(),
    displayName: createMockString(),
    ...props,
  });
