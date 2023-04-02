import { AddressDTO } from './Address';

export class SupplierResponse {
  data: SupplierDTO[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class SupplierDTO {
  id: number | undefined;
  name: string | undefined;
  cnpj: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  active: boolean | undefined;
  address: AddressDTO | undefined;
}

export class RequestSupplierDTO {
  public constructor(init?: Partial<RequestSupplierDTO>) {
    Object.assign(this, init);
  }

  name: string | undefined;
  cnpj: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  street: string | undefined;
  number: string | undefined;
  complement: string | undefined;
  district: string | undefined;
  city: string | undefined;
  state: string | undefined;
  cep: string | undefined;
}
