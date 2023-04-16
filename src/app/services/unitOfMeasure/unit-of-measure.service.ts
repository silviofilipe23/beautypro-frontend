import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnitOfMeasureService {
  constructor(private http: HttpClient) {}

  listUnitOfMeasure() {
    return this.http.get<any>(
      `${environment.urlBase}/products/unit-of-measure`,
      { observe: 'response' }
    );
  }
}
