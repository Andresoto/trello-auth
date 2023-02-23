import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  recovery(email: string) {
    return this.http.post(`https://fake-trello-api.herokuapp.com/api/v1/auth/recovery`, {email});
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`https://fake-trello-api.herokuapp.com/api/v1/auth/change-password`, {token, newPassword})
  }
}
