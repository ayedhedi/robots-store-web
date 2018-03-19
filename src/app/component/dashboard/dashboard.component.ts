import { Component, OnInit } from '@angular/core';
import { ApiService} from "../../shared/service/api.service";
import {Robot} from "../../shared/domain/robot";
import {AuthenticationService} from "../../shared/service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  robots: Robot[];
  codes: string[];
  selectedCode: string;
  selectedRobot: Robot;

  admin: boolean;

  constructor(private apiService:ApiService,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.apiService.getAllRobots().subscribe(robots => {
      this.robots = robots;
      this.codes = this.robots.map(r => r.code);
    });
    this.admin = this.authenticationService.getCurrentUser() &&
      this.authenticationService.getCurrentUser().admin;
  }

  onSearchChange(searchValue : string ) {
    this.codes = this.robots.map(r => r.code).filter(s => s.match(searchValue));
  }

  selectCode(code) {
    this.selectedCode = code;
    this.selectedRobot = this.robots.find(r => r.code == code);
    console.log(this.selectedRobot);
  }

  signout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }


}
