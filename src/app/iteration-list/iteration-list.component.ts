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
  @Input() project: Project;
  @Output() change: EventEmitter<Iteration> = new EventEmitter<Iteration>();

  allIterations: Iteration[];
  iterations: Iteration[];
  selectedIteration: Iteration;
  project_id: number = 0;

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.project !== undefined) {
      this.project_id = this.project.id;
      console.log(this.project_id);
    }
    this.dataService.getIterations().then(iterations => {
      this.allIterations = iterations;
      this.iterations = iterations.filter(item => item.project_id === this.project_id);
      this.selectedIteration = this.iterations[0];
      this.selectedService.iteration = this.selectedIteration;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let project = changes.project.currentValue;
    if (project !== undefined) {
      this.project_id = project.id;
      this.iterations = this.allIterations.filter(
        item => item.project_id === this.project.id
      );
      this.selectedIteration = this.iterations[0];
      this.selectedService.iteration = this.selectedIteration;
      if (this.selectedIteration !== undefined) {
        this.change.emit(this.selectedIteration);
        this.router.navigate(["/board", btoa(this.selectedIteration.name)]);
      }
    }

  }

  onChange(event) {
    event.stopPropagation();
    console.log(this.selectedIteration);
    this.selectedService.iteration = this.selectedIteration;
    this.change.emit(this.selectedIteration);
    this.router.navigate(["/board", btoa(this.selectedService.iteration.name)]);
  }
}
