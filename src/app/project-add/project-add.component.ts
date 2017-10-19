import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { DataService } from '../data.service';
import { Project } from '../project'

@Component({
  selector: 'project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Input() title: string = "Add";
  @Input() projects: Project[] = [];

  projectName: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
  }

  addProject(projectName: string): void {
    if (projectName !== "") {
      let project : Project = new Project("", projectName, null, null);
      this.dataService.addProject(project);
      this.projectName = "";
    }
    this.add.emit(null);
  }
}
