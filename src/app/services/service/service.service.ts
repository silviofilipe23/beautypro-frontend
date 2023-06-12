import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  listServices(
    page: number,
    size: number,
    start: string | null,
    end: string | null
  ) {
    return this.http.get<any>(
      `${environment.urlBase}/services?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (start !== null ? `&start=${start}` : '') +
        (end !== null ? `&end=${end}` : ''),
      { observe: 'response' }
    );
  }
}