import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/service/authentication.service";
import {Router} from "@angular/router";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  ngOnInit() {}

  signout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

}
