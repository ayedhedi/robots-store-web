import {Component, OnInit, Input} from '@angular/core';
import {Robot} from "../../shared/domain/robot";

@Component({
  selector: 'robot-detail',
  templateUrl: './robot-detail.component.html',
  styleUrls: ['./robot-detail.component.css']
})
export class RobotDetailComponent implements OnInit {

  @Input() robot: Robot;

  constructor() { }

  ngOnInit() {
  }

  imagePath() {
    return `assets/images/${this.robot.image}.jpg`
  }
}
