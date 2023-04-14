import { Person } from "./Person";

export class User extends Person {
  public constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }

  override id: number | undefined;
}