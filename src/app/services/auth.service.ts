import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";
import { TokenService } from "@services/token.service";
import { ResponseLogin } from "@models/auth.model";
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`https://fake-trello-api.herokuapp.com/api/v1/auth/login`, {email, password})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    )
  }

  refreshToken(refreshToken: string) {
    return this.http.post<ResponseLogin>(`https://fake-trello-api.herokuapp.com/api/v1/auth/refresh-token`, {refreshToken})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    )
  }

  recovery(email: string) {
    return this.http.post(`https://fake-trello-api.herokuapp.com/api/v1/auth/recovery`, {email});
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`https://fake-trello-api.herokuapp.com/api/v1/auth/change-password`, {token, newPassword})
  }

  getProfile() {
    // Sin interceptors mandamos el token en el header

    // const token = this.tokenService.getToken();
    // return this.http.get<User>(`https://fake-trello-api.herokuapp.com/api/v1/auth/profile`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }).pipe(
    //   tap( user => {
    //     this.user$.next(user);
    //   })
    // )

    // Con interceptor

    return this.http.get<User>(`https://fake-trello-api.herokuapp.com/api/v1/auth/profile`, { context: checkToken() })
    .pipe(
      tap( user => {
        this.user$.next(user);
      })
    )
  }

  getDataUser() {
    return this.user$.getValue();
  }

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }
}
