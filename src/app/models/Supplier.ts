import { Address } from './Address';

export class SupplierResponse {
  data: Supplier[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class Supplier {
  public constructor(init?: Partial<Supplier>) {
    Object.assign(this, init);
  }

  id: number | undefined;
  corporateName: string | undefined;
  cnpj: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  observations: string | undefined;
  active: boolean | undefined;
  address: Address | undefined;
}
