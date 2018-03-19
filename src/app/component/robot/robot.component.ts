import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Robot} from "../../shared/domain/robot";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../../shared/service/authentication.service";
import {ApiService} from "../../shared/service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit {

  @Input() robot: Robot;
  @Output() action: EventEmitter<number> = new EventEmitter();

  modalRef: NgbModalRef;
  admin: boolean;

  constructor(private modalService: NgbModal,
              private apiService: ApiService,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.admin = this.authService.getCurrentUser() &&
                  this.authService.getCurrentUser().admin;
  }

  view(content) {
    this.modalRef = this.modalService.open(content);
  }

  deleteRobot(){
    this.apiService.deleteRobot(this.robot.id).subscribe(() => {
        alert(`Robot ${this.robot.code} is succesfully deleted`);
        this.modalRef.close();
        this.action.emit(0); //0 -> robot deleted
      },
      () => {
        alert(`Error when trying to delete robot ${this.robot.code}`)
      })
  }

  updateRobot(){
    this.modalRef.close();
    this.router.navigate(['/robot', this.robot.id])
  }

  imagePath() {
    return `assets/images/${this.robot.image}.jpg`
  }

}
