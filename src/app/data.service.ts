import { Injectable } from '@angular/core';

import { SelectedService } from './selected.service';

import { Project } from './project';
import { Iteration } from './iteration';
import { IterationItem } from './iteration-item';

@Injectable()
export class DataService {
  projects: Project[] = [];
  iterations: Iteration[] = [];

  private lsNameProjects: string = '_ng_ds_projects';
  private lsNameIterations: string = '_ng_ds_iterations';

  constructor(private selectedService: SelectedService) {
    let localProjects = localStorage.getItem(this.lsNameProjects);
    if (localProjects !== null) {
      this.projects = JSON.parse(localProjects) as Project[];
    }
    let localIterations = localStorage.getItem(this.lsNameIterations);
    if (localIterations !== null) {
      this.iterations = JSON.parse(localIterations) as Iteration[];
    }
  }

  getProjects() : Promise<Project[]> {
    return Promise.resolve(this.projects);
  }

  addProject(project: Project) : void {
    this.projects.push(project);
    this.save();
  }

  deleteProject(project: Project) : Project[] {
    this.projects.splice(this.projects.indexOf(project), 1);
    this.save();
    return this.projects;
  }

  getIterations() : Promise<Iteration[]> {
    return Promise.resolve(this.iterations);
  }

  addIteration(iteration: Iteration) {
    let project: Project = this.selectedService.project;
    iteration.project_id = project.id;
    this.iterations.push(iteration);
    this.save();
  }

  deleteIteration(iteration: Iteration): Iteration[] {
    this.iterations.splice(this.iterations.indexOf(iteration), 1);
    this.save();
    return this.iterations;
  }

  addIterationItem(iterationItem: IterationItem) {
    let iteration: Iteration = this.selectedService.iteration;
    iteration.todo.push(iterationItem);
    this.save();
  }

  addIterationItemTo(iterationItem: IterationItem, to: string) {
    let iteration: Iteration = this.selectedService.iteration;
    iteration[to].push(iterationItem);
    this.save();
  }

  deleteIterationItem(iterationItem: IterationItem) {
    let iteration: Iteration = this.selectedService.iteration;
    let todo: number = iteration.todo.indexOf(iterationItem);
    let doing: number = iteration.doing.indexOf(iterationItem);
    let done: number = iteration.done.indexOf(iterationItem);

    if (todo) {
      iteration.todo.splice(todo, 1);
    }

    if (doing) {
      iteration.doing.splice(doing, 1);
    }

    if (done) {
      iteration.done.splice(done, 1);
    }

    this.save();
  }

  deleteIterationItemFrom(iterationItem: IterationItem, _from: string) {
    let iteration: Iteration = this.selectedService.iteration;
    iteration[_from].splice(iteration[_from].indexOf(iterationItem), 1);
    this.save();
  }

  private save() : void {
    localStorage.setItem(this.lsNameProjects, JSON.stringify(this.projects));
    localStorage.setItem(this.lsNameIterations, JSON.stringify(this.iterations));
  }
}
