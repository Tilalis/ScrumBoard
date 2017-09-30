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

  iterations: Iteration[];
  selectedIteration: Iteration;

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private router: Router
  ) {
    this.selectedService.getProjectObservable().subscribe(
      project => {
        this.iterations = project? project.iterations : [];
      }
    )
  }

  ngOnInit() {
    this.selectedIteration = undefined;
    this.selectedService.iteration = undefined;
  }

  onChange() {
    this.selectedService.iteration = this.selectedIteration;
    console.log(this.iterations);
    this.router.navigate(['board']);
  }

}
