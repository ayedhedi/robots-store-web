import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import  {ApiService} from "../../shared/service/api.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Robot} from "../../shared/domain/robot";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RobotCategory} from "../../shared/domain/robot-category";
import {RobotFunction} from "../../shared/domain/robot-function";
import "rxjs/add/operator/map";
import * as _ from "lodash";
import {ToolsService} from "../../shared/service/tools.service";

@Component({
  selector: 'app-robot-update',
  templateUrl: './robot-update.component.html',
  styleUrls: ['./robot-update.component.css']
})
export class RobotUpdateComponent implements OnInit {

  @ViewChild('content') templateRef:TemplateRef<any>;

  robot: Robot;
  clone: Robot;
  modalRef: NgbModalRef;
  images: string[];

  constructor(private modalService: NgbModal,
              private apiService: ApiService,
              private toolsService: ToolsService,
              private route: ActivatedRoute,
              private router: Router) {

    this.images = toolsService.getAvailableImages();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiService.getOneRobot(id).subscribe((robot) => {
          this.robot = robot;
          this.clone = _.clone(robot);
          this.openModal();
        });
      }
    });
  }

  categories() {
    return Object.keys(RobotCategory).filter(k => typeof RobotCategory[k as any] === "number");
  }

  functions() {
    return  Object.keys(RobotFunction).filter(k => typeof RobotFunction[k as any] === "number");
  }

  openModal() {
    this.modalRef = this.modalService.open(this.templateRef);
  }

  change() {
    return !_.isEqual(this.robot, this.clone);
  }

  imagePath(image) {
    return `assets/images/${image}.jpg`
  }

  close(){
    this.modalRef.close(this.templateRef);
    this.router.navigate(['/']);
  }

  updateRobot() {
    this.apiService.updateRobot(this.robot).subscribe((robot) => {
      alert(`The robot ${robot.code} has been successfully updated`);
      this.clone = robot;
    });
  }

  createRobot() {

  }

}
