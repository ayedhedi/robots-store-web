import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Robot} from "../../shared/domain/robot";
import {ToolsService} from "../../shared/service/tools.service";
import {RobotCategory} from "../../shared/domain/robot-category";
import {RobotFunction} from "../../shared/domain/robot-function";
import * as _ from "lodash";

@Component({
  selector: 'robot-form',
  templateUrl: './robot-form.component.html',
  styleUrls: ['./robot-form.component.css']
})
export class RobotFormComponent implements OnInit {

  @Input() robot: Robot;
  @Input() showClose: boolean = true;
  @Output() closed: EventEmitter<void> = new EventEmitter();
  @Output() saved: EventEmitter<Robot> = new EventEmitter();

  clone: Robot;
  images: string[];

  constructor(private toolsService: ToolsService,) {
    this.images = toolsService.getAvailableImages();
  }

  ngOnInit() {
    this.clone = _.clone(this.robot);
  }

  categories() {
    return Object.keys(RobotCategory).filter(k => typeof RobotCategory[k as any] === "number");
  }

  functions() {
    return  Object.keys(RobotFunction).filter(k => typeof RobotFunction[k as any] === "number");
  }

  change() {
    return !_.isEqual(this.robot, this.clone);
  }

  imagePath(image) {
    return `assets/images/${image}.jpg`
  }

  close(){
    this.closed.emit();
  }

  save() {
    this.saved.emit(this.robot);
    this.clone = _.clone(this.robot);
  }
}
