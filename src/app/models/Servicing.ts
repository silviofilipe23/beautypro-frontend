import { User } from "./User";

export class Servicing {
    id: number | undefined;
    description: string | undefined;
    price: number | undefined;
    averageTime: number | undefined;
    preService: string | undefined;
    postService: string | undefined;
    returnDays: string | undefined;
    professionalList: User[] | undefined;
  }