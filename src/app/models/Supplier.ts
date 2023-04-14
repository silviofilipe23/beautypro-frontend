import { Address } from './Address';

export class SupplierResponse {
  data: Supplier[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class Supplier {
  id: number | undefined;
  name: string | undefined;
  cnpj: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  active: boolean | undefined;
  address: Address | undefined;
}

export class RequestSupplier {
  public constructor(init?: Partial<RequestSupplier>) {
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
