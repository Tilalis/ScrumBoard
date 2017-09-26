import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SelectedService } from '../selected.service';
import { DataService } from '../data.service';


import { Project }  from '../project';
import { Iteration }  from '../iteration';

@Component({
  selector: 'iteration-manager',
  templateUrl: './iteration-manager.component.html',
  styleUrls: ['./iteration-manager.component.css']
})
export class IterationManagerComponent implements OnInit {
  @Input() title : string = "Iteration List";

  selectedIteration: Iteration;
  allIterations: Iteration[] = [];
  iterations: Iteration[] = [];
  project_id: number;

  constructor(
    private selectedService: SelectedService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {
    this.selectedService.getProjectObservable().subscribe(
      project => {
        this.project_id = project? project.id: -1;
      }
    )
  }

  ngOnInit() {
    let project: Project = this.selectedService.project;
    this.project_id = project? project.id : -1;
    this.dataService.getIterations().then(
      iterations => {
        this.allIterations = iterations;
      }
    );
  }

  onSelect(iteration: Iteration) {
    this.selectedIteration = iteration;
    console.log(this.project_id);
  }

  delete() {
    this.iterations = this.dataService.deleteIteration(this.selectedIteration);
    this.selectedIteration = undefined;
  }

}
