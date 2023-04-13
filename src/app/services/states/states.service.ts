import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  constructor(private http: HttpClient) {}

  getStates() {
    return this.http.get<any>(`${environment.urlBase}/states`, {
      observe: 'response',
    });
  }

  getCitiesByStateId(stateId: number | undefined) {
    return this.http.get<any>(
      `${environment.urlBase}/states/${stateId}/cities`,
      {
        observe: 'response',
      }
    );
  }
}
