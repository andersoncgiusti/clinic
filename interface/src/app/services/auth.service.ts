import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(userEmail: string,  password: string) {
    const auth = { userEmail: userEmail, password: password };
    this.http.post(environment.apiUrl + '/api/user_authenticate', auth)
    .subscribe(response => {
      console.log(response);

    })
  }

  forgot(userEmail: string) {
    const auth = { userEmail: userEmail };
    this.http.post(environment.apiUrl + '/api/user_forgot_password', auth)
    .subscribe(response => {
      console.log(response);
      // this.router.navigate(["/reset"]);
    })
  }

  reset(userEmail: string, token: string, password: string) {
    const auth = { userEmail: userEmail, token: token, password: password };
    this.http.post(environment.apiUrl + '/api/user_reset_password', auth)
    .subscribe(response => {
      console.log(response);
      // this.router.navigate(["/login"]);
    })
  }


}
