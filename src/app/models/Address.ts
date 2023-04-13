export class Address {
  id: number | undefined;
  street: string | undefined;
  number: string | undefined;
  complement: string | undefined;
  district: string | undefined;
  city: City | undefined;
  cep: string | undefined;
}

export class City {
  id: number | undefined;
  name: string | undefined;
  uf: State | undefined;
  ibge: string | undefined;
  ddd: string | undefined;
}

export class State {
  id: number | undefined;
  name: string | undefined;
  uf: string | undefined;
}
