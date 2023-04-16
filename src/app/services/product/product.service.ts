import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(newProduct: Product) {
    return this.http.post<any>(`${environment.urlBase}/products`, newProduct, {
      observe: 'response',
    });
  }

  updateProduct(id: number, editProduct: Product) {
    return this.http.put<any>(
      `${environment.urlBase}/products/${id}`,
      editProduct,
      {
        observe: 'response',
      }
    );
  }

  listProduct(page: number, size: number, name: string | null) {
    return this.http.get<any>(
      `${environment.urlBase}/products?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (name !== null ? `&name=${name}` : ''),
      { observe: 'response' }
    );
  }
}
