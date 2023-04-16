import { Observable } from 'rxjs';
import { Supplier } from './../../models/Supplier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  createSupplier(newSupplier: Supplier): Observable<any> {
    return this.http.post<any>(
      `${environment.urlBase}/suppliers`,
      newSupplier,
      {
        observe: 'response',
      }
    );
  }

  updateSupplier(id: number, editSupplier: Supplier) {
    return this.http.put<any>(
      `${environment.urlBase}/suppliers/${id}`,
      editSupplier,
      {
        observe: 'response',
      }
    );
  }

  listSupplier(
    page: number,
    size: number,
    name: string | null,
    active: boolean | null
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.urlBase}/suppliers?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (name !== null ? `&name=${name}` : '') +
        (active !== null ? `&active=${active}` : ''),
      { observe: 'response' }
    );
  }

  deleteSupplier(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${environment.urlBase}/suppliers/${id}`, {
      observe: 'response',
    });
  }
}
