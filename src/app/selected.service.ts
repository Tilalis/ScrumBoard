import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Project } from './project';
import { Iteration } from './iteration';

@Injectable()
export class SelectedService {
  private projectSubject: Subject<Project> = new Subject<Project>();
  private iterationSubject: Subject<Iteration> = new Subject<Iteration>();

  selectedProject: Project;
  selectedIteration: Iteration;

  constructor() { }

  getProjectObservable(): Observable<Project> {
    return this.projectSubject.asObservable();
  }

  getIterationObservable(): Observable<Iteration> {
    return this.iterationSubject.asObservable();
  }

  send(): void {
    this.projectSubject.next(this.selectedProject);
  }

  set project(project: Project) {
    this.selectedProject = project;
    this.projectSubject.next(this.selectedProject);
  }

  get project() : Project {
    return this.selectedProject;
  }

  set iteration(iteration: Iteration) {
    this.selectedIteration = iteration;
    this.iterationSubject.next(this.selectedIteration);
  }

  get iteration() : Iteration {
    return this.selectedIteration;
  }
}
