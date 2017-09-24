import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { Project }  from '../project';

@Component({
  selector: 'project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  @Input() title : string = "List";

  selectedProject: Project;
  projects: Project[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProjects().then(projects => this.projects = projects);
  }

  onSelect(project: Project) {
    this.selectedProject = project;
  }

  delete() {
    this.dataService.deleteProject(this.selectedProject);
    this.selectedProject = undefined;
  }

}
