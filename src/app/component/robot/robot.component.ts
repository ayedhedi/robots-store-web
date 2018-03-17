import {Component, OnInit, Input} from '@angular/core';
import {Robot} from "../../shared/domain/robot";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit {

  @Input() robot: Robot;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {}

  view(content) {
    this.modalService.open(content);
  }

  imagePath() {
    return `assets/images/${this.robot.image}.jpg`
  }

}
