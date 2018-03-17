import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/service/authentication.service";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/service/api.service";
import {Robot} from "../../shared/domain/robot";
import {Page} from "../../shared/domain/page";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  robots$: Robot[];
  page$: Page;
  pageNum: number = 0;
  pageSize: number = 3;

  constructor(private authenticationService: AuthenticationService,
              private api: ApiService,
              private router: Router) {}

  ngOnInit() {
    this.robots$ = [];
    this.nextPage();
  }

  nextPage() {
    this.api
      .getPageRobot(this.pageNum, this.pageSize)
      .subscribe(data => {
        this.page$ = data;
        this.robots$ = this.robots$.concat(this.page$.content);
        console.log(this.page$.content.length);
      });
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

}
