import { SupplierDTO } from './Supplier';
import { UnitOfMeasureDTO } from './UnitOfMeasure';

export class ProductResponse {
  data: ProductDTO[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class ProductDTO {
  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  active: boolean | undefined;
  quantity: number | undefined;
  unitOfMeasure: UnitOfMeasureDTO | undefined;
  supplier: SupplierDTO | undefined;
}

export class RequestProductDTO {
  public constructor(init?: Partial<RequestProductDTO>) {
    Object.assign(this, init);
  }

  name: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
  idUnitOfMeasure: number | undefined;
  idSupplier: number | undefined;
}
