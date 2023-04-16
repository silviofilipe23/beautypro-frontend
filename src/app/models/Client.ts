import { Address } from './Address';

export class ClientResponse {
  data: Client[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class Client {
  public constructor(init?: Partial<Client>) {
    Object.assign(this, init);
  }

  id: number | undefined;
  name: string | undefined;
  cpf: string | undefined;
  rg: string | undefined;
  dateOfBirth: Date | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  observations: string | undefined;
  active: boolean | undefined;
  nameResponsible: string | undefined;
  cpfResponsible: string | undefined;
  rgResponsible: string | undefined;
  anamnese: string | undefined;
  address: Address | undefined;
}
