import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // createProduct(newProduct: RequestProduct) {
  //   return this.http.post<any>(`${environment.urlBase}/product`, newProduct, {
  //     observe: 'response',
  //   });
  // }

  // updateProduct(id: number, editProduct: RequestProduct) {
  //   return this.http.put<any>(
  //     `${environment.urlBase}/Product/${id}`,
  //     editProduct,
  //     {
  //       observe: 'response',
  //     }
  //   );
  // }

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
