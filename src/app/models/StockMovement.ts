import { Product } from "./Product";

export class StockMovement {
  id: number | undefined;
  product: Product | undefined;
  quantity: number | undefined;
  type: MovementType | undefined;
  date: Date | undefined;
}

export enum MovementType {
  IN,OUT
}