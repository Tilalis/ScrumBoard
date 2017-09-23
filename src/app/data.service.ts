import { Injectable } from '@angular/core';
import { Project } from './project';

@Injectable()
export class DataService {
  constructor() { }

  projects: Project[] = [
    new Project(0, "First"),
    new Project(1, "Second")
  ];

  getProjects() : Promise<Project[]> {
    return Promise.resolve(this.projects);
  }

  addProject(project: Project) : void {
    this.projects.push(project);
  }

  deleteProject(project: Project) : void {
    this.projects = this.projects.filter(
      p => p !== project
    );
    console.log(this.projects);
  }
}
