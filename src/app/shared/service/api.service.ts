import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as _ from "lodash";

import {Robot} from "../domain/robot";
import {Page} from "../domain/page";
import {environment} from "../../../environments/environment";

const API_BASE_URL = environment.apiBaseUrl;

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllRobots() {
    let url = API_BASE_URL + 'api/robots';

    return this.http.get<Robot[]>(url)
      .map(data => _.values(data));
  }

  getPageRobot(page: number, size: number){
    let url = API_BASE_URL + `api/robots/pageable?page=${page}&size=${size}`;

    return this.http.get<Page>(url);
  }

}
