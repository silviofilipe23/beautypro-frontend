import { ConsumedProducts } from './ConsumedProducts';
import { Product } from './Product';
import { User } from './User';

export class Servicing {
  public constructor(init?: Partial<Servicing>) {
    Object.assign(this, init);
  }
  id: number | undefined;
  description: string | undefined;
  price: number | undefined;
  averageTime: number | undefined;
  preService: string | undefined;
  postService: string | undefined;
  returnDays: string | undefined;
  professionalList: User[] | undefined;
  consumedProducts: ConsumedProducts[] | undefined;
  active: boolean | undefined;
}
