import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Project }  from '../project';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  selectedProject: Project;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProjects().then(
      projects => this.projects = projects
    );
  }

  onSelect(project: Project) {
    this.selectedProject = project;
  }

}
