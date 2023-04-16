import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicing } from 'src/app/models/Servicing';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicingService {
  constructor(private http: HttpClient) {}

  createServicing(newServicing: Servicing) {
    return this.http.post<any>(
      `${environment.urlBase}/servicing`,
      newServicing,
      {
        observe: 'response',
      }
    );
  }

  updateServicing(id: number, editServicing: Servicing) {
    return this.http.put<any>(
      `${environment.urlBase}/servicing/${id}`,
      editServicing,
      {
        observe: 'response',
      }
    );
  }

  listServicing(
    page: number,
    size: number,
    description: string | null,
    active: boolean | null
  ) {
    return this.http.get<any>(
      `${environment.urlBase}/servicing?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (description !== null ? `&description=${description}` : '') +
        (active !== null ? `&active=${active}` : ''),
      { observe: 'response' }
    );
  }
}
