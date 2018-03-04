import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

import { Robot } from "../domain/robot";
import { environment } from "../../../environments/environment";

const API_BASE_URL = environment.apiBaseUrl;

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllRobots(): Observable<Array<Robot>>{
    let url = API_BASE_URL + '/robots';
    console.log("api: get robots");
    return new EmptyObservable();
    //return this.http.get<Array<Robot>>(url);
  }

}
