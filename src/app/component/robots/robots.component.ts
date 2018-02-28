import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/service/api.service";
import {Robot} from "../../shared/domain/robot";

@Component({
  selector: 'app-robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css'],
  providers: [ApiService]
})
export class RobotsComponent implements OnInit {

  robots: Array<Robot>;

  constructor(private API: ApiService) { }

  ngOnInit() {
    this.API.getAllRobots().subscribe(data => {
      this.robots = data;
    })
  }

}
