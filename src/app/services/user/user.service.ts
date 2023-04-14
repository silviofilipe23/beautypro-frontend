import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  createUser(newUser: User) {
    return this.http.post<any>(`${environment.urlBase}/users`, newUser, {
      observe: 'response',
    });
  }

  updateUser(id: number, editUser: User) {
    return this.http.put<any>(
      `${environment.urlBase}/users/${id}`,
      editUser,
      {
        observe: 'response',
      }
    );
  }

  listUser(page: number, size: number, name: string | null) {
    return this.http.get<any>(
      `${environment.urlBase}/users?` +
        (page !== null ? `page=${page}` : '') +
        (size !== null ? `&size=${size}` : '') +
        (name !== null ? `&name=${name}` : ''),
      { observe: 'response' }
    );
  }
}
