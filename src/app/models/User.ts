import { Person } from './Person';
import { Role } from './Role';

export class UserResponse {
  data: User[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class User extends Person {
  public constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }

  override id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  roles: Role[] | undefined;
}
