import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from './user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private logined: boolean = false;
  public user: User;
  private url: string = "http://tlls.ddns.net:1337/api/projects/check";

  constructor(
    private http: Http
  ) {
    this.logined = JSON.parse(localStorage.getItem('logined'));
    console.log(this.logined);
  }

  setUser(user: User) : void {
    this.user = user;
  }

  authorize() : string {
    this.logined = true;
    return "Basic " + this.user.credentials();
  }

  logout() {
    this.logined = false;
    this.user = undefined;
    localStorage.removeItem('logined');
  }

  isLogined() {
    return this.logined;
  }

  setLogined(logined: boolean) {
    this.logined = logined;
  }
}
