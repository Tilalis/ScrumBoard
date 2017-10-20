import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SelectedService } from './selected.service';

import { Project } from './project';
import { Iteration } from './iteration';
import { IterationItem } from './iteration-item';

@Injectable()
export class DataService {
  projects: Project[] = [];

  private url: string = "http://tlls.ddns.net:1337/api/projects";

  constructor(
    private selectedService: SelectedService,
    private http: Http
  ) {
  }

  getProjects() : Promise<Project[]> {
    let self = this;
    return this
            .http
            .get(this.url,{
               withCredentials: true
            })
            .toPromise()
            .then(resp => {
              self.projects.splice(0, self.projects.length);
              let projects = resp.json() as Project[];
              self.projects.push(...projects);
              return self.projects;
            });
  }

  addProject(project: Project) : void {
    this.http.post(this.url, project,{
       withCredentials: true
    })
    .toPromise()
    .then(raw => {
      let res = raw.json();
            console.log(res);
      if (res.status == "OK") {
        project._id = res.project._id;
        this.projects.push(project);
      }
    })
    .catch(res => {
      alert("Error adding Project!");
    });
  }

  deleteProject(project: Project) : Project[] {
    if (this.selectedService.project === project) {
      this.selectedService.project = undefined;
    }

    let self = this;
    this.http.delete(this.url + "/" + project._id,{
       withCredentials: true
    })
    .toPromise()
    .then(raw => {
      let res = raw.json();
      if (res.status == "OK") {
        self.projects.splice(self.projects.indexOf(project), 1);
      }
    })

    return this.projects;
  }

  updateProject(project: Project) {
    this.http.put(this.url + "/" + project._id, project,{
       withCredentials: true
    })
    .toPromise()
    .then((raw) => {
      let res = raw.json();
      if (res.status == "OK") {
        project._id = res.project._id;
      }
    })
    .catch((raw) => {
      alert("Error adding Iteration!");
    })
  }

  addIteration(iteration: Iteration) {
    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      project.iterations.push(iteration);
      this.updateProject(project);
    }
  }

  deleteIteration(iteration: Iteration) {
    if (this.selectedService.iteration === iteration) {
      this.selectedService.iteration = undefined;
    }
    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      project.iterations.splice(project.iterations.indexOf(iteration), 1);
      this.updateProject(project);
    }
  }

  addIterationItem(iterationItem: IterationItem) {
    let iteration: Iteration = this.selectedService.iteration;
    iteration.todo.push(iterationItem);
    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      this.updateProject(project);
    }
  }

  addIterationItemTo(iterationItem: IterationItem, to: string) {
    let iteration: Iteration = this.selectedService.iteration;
    iteration[to].push(iterationItem);
    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      this.updateProject(project);
    }
  }

  addIterationItemToBacklog(iterationItem: IterationItem) {
    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      project.backlog.push(iterationItem);
      this.updateProject(project);
    }
  }

  deleteIterationItem(iterationItem: IterationItem) {
    let iteration: Iteration = this.selectedService.iteration;
    let todo: number = iteration.todo.indexOf(iterationItem);
    let doing: number = iteration.doing.indexOf(iterationItem);
    let done: number = iteration.done.indexOf(iterationItem);

    if (todo !== -1) {
      iteration.todo.splice(todo, 1);
      return;
    }

    if (doing !== -1) {
      iteration.doing.splice(doing, 1);
      return;
    }

    if (done !== -1) {
      iteration.done.splice(done, 1);
      return;
    }

    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      this.updateProject(project);
    }
  }

  deleteIterationItemFrom(iterationItem: IterationItem, _from: string) {
    let iteration: Iteration = this.selectedService.iteration;
    iteration[_from].splice(iteration[_from].indexOf(iterationItem), 1);
    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      this.updateProject(project);
    }
  }

  deleteIterationItemFromBacklog(iterationItem: IterationItem) {
    let project: Project = this.selectedService.project;
    if (project !== undefined) {
      project.backlog.splice(project.backlog.indexOf(iterationItem), 1);
      this.updateProject(project);
    }
  }

  isIterationItemBacklog(iterationItem: IterationItem): boolean {
    return this.selectedService.project.backlog.indexOf(iterationItem) !== -1;
  }

}
