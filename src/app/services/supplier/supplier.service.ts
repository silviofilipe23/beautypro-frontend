import { Observable } from 'rxjs';
import { RequestSupplier } from './../../models/Supplier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  createSupplier(newSupplier: RequestSupplier): Observable<any> {
    return this.http.post<any>(
      `${environment.urlBase}/suppliers`,
      newSupplier,
      {
        observe: 'response',
      }
    );
  }

  // updateClient(id: number, editClient: RequestClientDTO) {
  //   return this.http.put<any>(
  //     `${environment.urlBase}/suppliers/${id}`,
  //     editClient,
  //     {
  //       observe: 'response',
  //     }
  //   );
  // }

  listSupplier(
    page: number,
    size: number,
    name: string | null
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.urlBase}/suppliers?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (name !== null ? `&name=${name}` : ''),
      { observe: 'response' }
    );
  }

  deleteSupplier(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${environment.urlBase}/suppliers/${id}`, {
      observe: 'response',
    });
  }
}
