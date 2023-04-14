import { Address } from "./Address";

export class Person {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  observations: string | undefined;
  active: boolean | undefined;
  address: Address | undefined;
}