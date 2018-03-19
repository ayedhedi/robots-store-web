import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

import 'rxjs/add/operator/map'
import {User} from "../domain/user";

const API_BASE_URL = environment.apiBaseUrl;

@Injectable()
export class AuthenticationService {

    currentUser: User;

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
      let url = API_BASE_URL + 'login';
      return this.http.post<any>(url, JSON.stringify({ username: username, password: password }), {observe: 'response'});
    }

    setUser(user:User) {
      this.currentUser = user;
    }

    getCurrentUser():User {
      return this.currentUser;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
      this.currentUser = null;
    }
}
