import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  constructor() {}

  /**
   * Verifica se existe o pageSize no sessionStorage
   * @param pageSize
   */
  public isPageSize() {
    return sessionStorage.getItem('pageSize') == null ? false : true;
  }

  /**
   * Define a quantidade de itens por página nas tabelas
   * @param pageSize
   */
  public setPageSize(pageSize: string) {
    sessionStorage.setItem('pageSize', `${pageSize}`);
  }

  /**
   * Busca no session Storage a quantidade de itens da tabela
   * @returns
   */
  public getPageSize(): number {
    return Number(sessionStorage.getItem('pageSize'));
  }
}
