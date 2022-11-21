import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAthenticated = false;
  private isAthenticatedCommum!: String;
  private isAthenticatedCommumSignup!: String;
  private token!: String;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken() {
    return this.token;
  }

  getPermission() {
    return this.isAthenticatedCommum;
  }

  getPermissionSignup() {
    return this.isAthenticatedCommumSignup;
  }

  getIsAuth() {
    return this.isAthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(userEmail: string,  password: string) {
    const auth = { userEmail: userEmail, password: password };
    this.http.post<{ token: string, expiresIn: number, userPermission: string, userId: string }>(environment.apiUrl + '/api/user_authenticate', auth)
    .subscribe(response => {
      // console.log('response', response);

      localStorage.setItem('user', response.userId);

      const permission = response.userPermission
      this.isAthenticatedCommum = permission;
      this.isAthenticatedCommumSignup = permission;

      const token = response.token
      this.token = token;
      if (token && permission === 'administrador') {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);

        this.isAthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, permission);
        this.router.navigate(['/clinica/tab1']);
      }

      if (token && permission === 'paciente') {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);

        this.isAthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, permission);
        this.router.navigate(['/paciente/tab1']);
      }

      if (token && permission === 'fisioterapeuta') {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);

        this.isAthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, permission);
        this.router.navigate(['/fisioterapeuta/tab1']);
      }

    })
  }

  forgot(userEmail: string) {
    const auth = { userEmail: userEmail };
    this.http.post(environment.apiUrl + '/api/user_forgot_password', auth)
    .subscribe(response => {
      // console.log(response);
      // this.router.navigate(["/reset"]);
    })
  }

  reset(userEmail: string, token: string, password: string) {
    const auth = { userEmail: userEmail, token: token, password: password };
    this.http.post(environment.apiUrl + '/api/user_reset_password', auth)
    .subscribe(response => {
      // console.log(response);
      // this.router.navigate(["/login"]);
    })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation!.token;
      this.isAthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.isAthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userPermission: string,
    // userId: string
    ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('permission', userPermission);
    // localStorage.setItem('user', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('permission');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const permission = localStorage.getItem('permission');
    const user = localStorage.getItem('user');
    if (
      !token ||
      !expirationDate ||
      !permission
      || !user
      ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      permission: permission,
      user: user,
    }
  }


}

