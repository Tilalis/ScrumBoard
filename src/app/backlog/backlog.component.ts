import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SelectedService } from '../selected.service';
import { DataService } from '../data.service';

import { Project } from '../project';
import { IterationItem } from '../iteration-item';

@Component({
  selector: 'backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlog: IterationItem[];

  constructor (
    private selectedService: SelectedService,
    private router: Router
  ) { }

  ngOnInit() {
    let project: Project = this.selectedService.project;

    if (project !== undefined) {
      this.backlog = project.backlog;
    } else {
      alert('You must select Project first!');
      this.router.navigate(['projects']);
    }


  }

}
