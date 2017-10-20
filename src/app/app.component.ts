import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SelectedService } from './selected.service';
import { UserService } from './user.service';
import { Iteration } from './iteration';
import { Project} from './project';

import { ModalComponent } from './modal/modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;
  title : string = 'ScrumBoard';
  project_id: string = "";
  base64_iteration_name: string = '';

  constructor(
    public router: Router,
    private location: Location,
    private selectedService: SelectedService,
    private userService: UserService
  ) {}

  onBack() {
    this.location.back();
  }

  onProjectChange(project: Project) {
    this.project_id = project._id;
  }

  onIterationChange(iteration: Iteration) {
    if (iteration !== undefined) {
      this.base64_iteration_name = btoa(iteration.name);
    }
  }

  showModal() : void {
  }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    if (!this.userService.isLogined()) {
      this.loginModal.show();
    }
  }
}
