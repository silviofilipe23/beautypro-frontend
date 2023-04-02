import {
  LoginRequest,
  RequestResetPassword,
  ValidateToken,
} from './../../models/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  signIn(loginRequest: LoginRequest) {
    return this.http.post<any>(
      `${environment.urlBase}/auth/signin`,
      loginRequest,
      { observe: 'response' }
    );
  }

  reqResetPassword(reqReset: RequestResetPassword) {
    return this.http.post<any>(
      `${environment.urlBase}/auth/reset-password`,
      reqReset,
      { observe: 'response' }
    );
  }

  validate(validateToken: ValidateToken) {
    return this.http.post<any>(
      `${environment.urlBase}/auth/validate-token`,
      validateToken,
      { observe: 'response' }
    );
  }
}
