import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberUrl(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((responce: any) => {
        const user = responce;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.changeMemberUrl(this.getCurrentUserPhotoUrl());
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getLoggedInUsername() {
    const token = localStorage.getItem('token');
    if (this.loggedIn()) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.unique_name;
    }
  }

  getDecodedToken() {
    const token = localStorage.getItem('token');
    if (this.loggedIn()) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    }
  }

  getCurrentUser() {
    if (this.loggedIn()) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      return user;
    }
  }

  getCurrentUserPhotoUrl() {
    if (this.loggedIn()) {
      let u =  localStorage.getItem('user');
      u = u.slice(u.indexOf('"photoUrl":"'), u.length - 1);
      u = u.slice(12, u.length - 1);
      return u;
    }
  }
}
