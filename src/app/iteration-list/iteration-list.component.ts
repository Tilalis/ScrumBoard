import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { SelectedService } from '../selected.service';

import { Project }  from '../project';
import { Iteration }  from '../iteration';

@Component({
  selector: 'iteration-list',
  templateUrl: './iteration-list.component.html',
  styleUrls: ['./iteration-list.component.css']
})
export class IterationListComponent implements OnInit {
  @Input() title: string = 'Iteration';
  @Output() change: EventEmitter<Iteration> = new EventEmitter<Iteration>();

  allIterations: Iteration[] = [];
  iterations: Iteration[];
  selectedIteration: Iteration;
  project_id: number

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private router: Router
  ) {
    this.selectedService.getProjectObservable().subscribe(
      project => {
        this.project_id = project.id;
      }
    )
  }

  ngOnInit() {
    this.dataService.getIterations().then(
      iterations => {
        this.allIterations = iterations;
        this.project_id = this.selectedService.project.id;
        this.selectIteration(this.project_id);
        this.router.navigate(['board']);
    });
  }

  onChange() {
    this.selectedService.iteration = this.selectedIteration;
    this.router.navigate(['board']);
  }

  selectIteration(project_id: number) {
    if (this.allIterations) {
      this.selectedIteration = this.allIterations.find(
        element => element.project_id == project_id
      );
      this.selectedService.iteration = this.selectedIteration;
    }
  }

}
