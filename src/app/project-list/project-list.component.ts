import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { SelectedService } from '../selected.service';

import { Project }  from '../project';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() title: string = 'Project';
  @Output() change: EventEmitter<Project> = new EventEmitter<Project>();

  projects: Project[];
  selectedProject: Project;

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getProjects().then(projects => {
      this.projects = projects;
      this.selectedProject = this.projects[0];
      this.selectedService.project = this.selectedProject;
    });
  }

  onChange(event) {
    event.stopPropagation();
    this.selectedService.project = this.selectedProject;
    console.log(this.selectedProject);
    this.change.emit(this.selectedService.project);
    this.router.navigate(["/"]);
  }

}
