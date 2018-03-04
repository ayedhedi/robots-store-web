import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../shared/service/index';
import { HttpErrorResponse } from "@angular/common/http";
import {User} from "../../shared/domain/user";

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                  let token = data.headers.get('Authorization');
                  if (token){
                    let user:User = {
                      username: this.model.username,
                      token: token
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    this.router.navigate([this.returnUrl]);
                  }else {
                    this.alertService.error("Invalid login response: please contact support team");
                  }
                   this.loading = false;
                },
                (error: HttpErrorResponse) => {
                    let message = error.message || 'Cannot Login: unkown error';
                    if (error.status == 401) {
                      message = 'Invalid credentials: please try again';
                    }
                    this.alertService.error(message);
                    this.loading = false;
                });
    }
}
