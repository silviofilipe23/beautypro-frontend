import { RequestClientDTO } from './../../models/Client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  createClient(newClient: RequestClientDTO) {
    return this.http.post<any>(`${environment.urlBase}/client`, newClient, {
      observe: 'response',
    });
  }

  updateClient(id: number, editClient: RequestClientDTO) {
    return this.http.put<any>(
      `${environment.urlBase}/client/${id}`,
      editClient,
      {
        observe: 'response',
      }
    );
  }

  listClient(page: number, size: number, name: string | null) {
    return this.http.get<any>(
      `${environment.urlBase}/client?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (name !== null ? `&name=${name}` : ''),
      { observe: 'response' }
    );
  }
}
