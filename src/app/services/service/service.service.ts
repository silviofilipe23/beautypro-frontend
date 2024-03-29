import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/models/Service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  listServices(
    page: number,
    size: number,
    start?: string | null,
    end?: string | null,
    open?: boolean | null
  ) {
    return this.http.get<any>(
      `${environment.urlBase}/services?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (start !== null ? `&start=${start}` : '') +
        (end !== null ? `&end=${end}` : '') +
        (open !== null ? `&open=${open}` : ''),
      { observe: 'response' }
    );
  }

  listServicesDesc(
    page: number,
    size: number,
    start?: string | null,
    end?: string | null,
    open?: boolean | null
  ) {
    return this.http.get<any>(
      `${environment.urlBase}/services/filter?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (start !== null ? `&start=${start}` : '') +
        (end !== null ? `&end=${end}` : '') +
        (open !== null ? `&open=${open}` : ''),
      { observe: 'response' }
    );
  }

  listAvailableTime(start: string | null, end: string | null) {
    return this.http.get<any>(
      `${environment.urlBase}/services/available-time?` +
        (start !== null ? `start=${start}` : '') +
        (end !== null ? `&end=${end}` : ''),
      { observe: 'response' }
    );
  }

  chartServices() {
    return this.http.get<any>(`${environment.urlBase}/services/pie-chart`, {
      observe: 'response',
    });
  }

  chartServicings() {
    return this.http.get<any>(
      `${environment.urlBase}/services/servicings-chart`,
      { observe: 'response' }
    );
  }

  chartPrice() {
    return this.http.get<any>(`${environment.urlBase}/services/price-chart`, {
      observe: 'response',
    });
  }

  chartDaily() {
    return this.http.get<any>(`${environment.urlBase}/services/daily-chart`, {
      observe: 'response',
    });
  }

  updateAppointment(id: number, editAppointment: Service) {
    return this.http.put<any>(
      `${environment.urlBase}/services/${id}`,
      editAppointment,
      {
        observe: 'response',
      }
    );
  }

  createAppointment(newAppointment: Service) {
    return this.http.post<any>(
      `${environment.urlBase}/services`,
      newAppointment,
      {
        observe: 'response',
      }
    );
  }

  createBase64Signature(id: number, base64Signature: any) {
    return this.http.post<any>(
      `${environment.urlBase}/services/signature?id=${id}`,
      base64Signature,
      {
        observe: 'response',
      }
    );
  }

  listServiceClient(page: number, size: number, id: number | null) {
    return this.http.get<any>(
      `${environment.urlBase}/services/by-client?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (id !== null ? `&id=${id}` : ''),
      { observe: 'response' }
    );
  }
}
