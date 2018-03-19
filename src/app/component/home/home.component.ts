﻿import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/service/authentication.service";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/service/api.service";
import {Robot} from "../../shared/domain/robot";
import {Page} from "../../shared/domain/page";
import {environment} from "../../../environments/environment";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  robots$: Robot[];
  page$: Page;
  admin: boolean;
  pageNum: number = 0;
  pageSize: number = 10;
  isProduction: boolean = environment.production;

  constructor(private authenticationService: AuthenticationService,
              private api: ApiService,
              private router: Router) {}

  ngOnInit() {
    console.log("init home");
    this.robots$ = [];
    this.nextPage();
    this.admin = this.authenticationService.isAdmin();
  }

  nextPage() {
    this.api
      .getPageRobot(this.pageNum, this.pageSize)
      .subscribe(data => {
        this.page$ = data;
        this.robots$ = this.robots$.concat(this.page$.content);
      });
  }

  action($event, robot: Robot) {
    switch ($event) {
      case 0:
        //remove the robot from the list
            this.robots$ = this.robots$.filter(r => r !== robot);
    }
  }

  signout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  onScroll () {
    if (this.page$ && !this.page$.last){
      this.pageNum++;
      this.nextPage();
    }
  }

  goDashboard(){
    this.router.navigate(['dashboard'])
  }

}
