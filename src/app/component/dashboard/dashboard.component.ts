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
  newRobot: boolean = false;
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
      this.selectedRobot = this.robots[0];
      this.selectedCode = this.selectedRobot.code;
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
    this.newRobot = false;
  }

  signout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  createRobot() {
    this.newRobot = true;
    this.selectedCode = null;
    this.selectedRobot = {
      id: null,
      name: 'New robot',
      category: 'DOG',
      code: '',
      brand: '',
      description: '',
      price: 0,
      quantity: 0,
      image: null,
      available: true,
      functions: []
    }
  }

  save() {
    if (this.newRobot) {
      this.apiService.saveRobot(this.selectedRobot).subscribe((robot) => {
        alert(`The robot ${this.selectedRobot.name} has been successfully created`);
        this.robots.push(this.selectedRobot);
        this.codes.push(this.selectedRobot.code);
      })
    }else {
      this.apiService.updateRobot(this.selectedRobot).subscribe((robot) => {
        alert(`The robot ${this.selectedRobot.code} has been successfully updated`);
      });
    }
  }

}
