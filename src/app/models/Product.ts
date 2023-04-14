import { Supplier } from './Supplier';
import { UnitOfMeasure } from './UnitOfMeasure';

export class ProductResponse {
  data: Product[] | undefined;
  total: number | undefined;
  pages: number | undefined;
  size: number | undefined;
}

export class Product {
  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  active: boolean | undefined;
  quantity: number | undefined;
  unitOfMeasure: UnitOfMeasure | undefined;
  supplier: Supplier | undefined;
}
