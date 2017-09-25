import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SelectedService } from './selected.service';
import { Iteration } from './iteration';
import { Project} from './project';

import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'ScrumBoard';
  project_id: number = 0;
  base64_iteration_name: string = '';

  constructor(public router: Router, private location: Location, private selectedService: SelectedService) {}

  onBack() {
    this.location.back();
  }

  onProjectChange(project: Project) {
    this.project_id = project.id;
  }

  onIterationChange(iteration: Iteration) {
    if (iteration !== undefined) {
      this.base64_iteration_name = btoa(iteration.name);
    }
  }

  showModal() : void {
  }
}
