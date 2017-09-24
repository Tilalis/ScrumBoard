import { Injectable } from '@angular/core';

import { Project } from './project';
import { Iteration } from './iteration';

@Injectable()
export class SelectedService {
  selectedProject: Project;
  selectedIteration: Iteration;

  constructor() { }

  set project(project: Project) {
    this.selectedProject = project;
  }

  get project() : Project {
    return this.selectedProject;
  }

  set iteration(iteration: Iteration) {
    this.selectedIteration = iteration;
  }

  get iteration() : Iteration {
    return this.selectedIteration;
  }
}
