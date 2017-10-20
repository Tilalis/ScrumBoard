import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private logined: boolean = false;
  private url: string = "http://tlls.ddns.net:1337/api/users";

  constructor(private http: Http) {
    this.logined = JSON.parse(localStorage.getItem('logined'));
    console.log(this.logined);
  }

  login(name: string, password: string) : Promise<boolean> {
    let self = this;
    return this.http.post(this.url + "/login", {
      "name": name,
      "password": password
    }, {
       withCredentials: true
    })
    .toPromise()
    .then((raw) => {
      let res = raw.json();
      if (res.status = "OK") {
        this.logined = true;
      }
      return this.logined;
    });
  }

  logout() : Promise<boolean> {
    return this.http.get(this.url + "/logout", {
       withCredentials: true
    })
    .toPromise()
    .then(() => {
      this.logined = false;
      localStorage.setItem('logined', null);
      return this.logined;
    });
  }

  isLogined() {
    return this.logined;
  }
}
