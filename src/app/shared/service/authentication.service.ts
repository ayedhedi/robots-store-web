import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

import 'rxjs/add/operator/map'

const API_BASE_URL = environment.apiBaseUrl;

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
      let url = API_BASE_URL + 'login';
      return this.http.post<any>(url, JSON.stringify({ username: username, password: password }), {observe: 'response'});
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
