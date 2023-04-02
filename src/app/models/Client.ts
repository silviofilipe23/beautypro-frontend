import { AddressDTO } from './Address';
import { Address } from 'cluster';

export class ClientResponse {
  data: ClientDTO[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class ClientDTO {
  id: number | undefined;
  name: string | undefined;
  cpf: string | undefined;
  rg: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  observations: string | undefined;
  active: boolean | undefined;
  address: AddressDTO | undefined;
}

export class RequestClientDTO {
  public constructor(init?: Partial<RequestClientDTO>) {
    Object.assign(this, init);
  }

  name: string | undefined;
  cpf: string | undefined;
  rg: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  observations: string | undefined;
  street: string | undefined;
  number: string | undefined;
  complement: string | undefined;
  district: string | undefined;
  city: string | undefined;
  state: string | undefined;
  cep: string | undefined;
}
