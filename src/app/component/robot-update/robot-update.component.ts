import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import  {ApiService} from "../../shared/service/api.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Robot} from "../../shared/domain/robot";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-robot-update',
  templateUrl: './robot-update.component.html',
  styleUrls: ['./robot-update.component.css']
})
export class RobotUpdateComponent implements OnInit {

  @ViewChild('content') templateRef:TemplateRef<any>;

  robot: Robot;
  modalRef: NgbModalRef;


  constructor(private modalService: NgbModal,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiService.getOneRobot(id).subscribe((robot) => {
          this.robot = robot;
          this.modalRef = this.modalService.open(this.templateRef);
        });
      }
    });
  }

  closed(){
    this.modalRef.close(this.templateRef);
    this.router.navigate(['/']);
  }

  updated(robot) {
    this.apiService.updateRobot(this.robot).subscribe((robot) => {
      alert(`The robot ${robot.code} has been successfully updated`);
    });
  }

}
