import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import { SelectedService } from '../selected.service';

import { Project }  from '../project';
import { Iteration }  from '../iteration';

@Component({
  selector: 'iteration-manager',
  templateUrl: './iteration-manager.component.html',
  styleUrls: ['./iteration-manager.component.css']
})
export class IterationManagerComponent implements OnInit {
  @Input() title : string = "List";

  selectedIteration: Iteration;
  allIterations: Iteration[] = [];
  iterations: Iteration[] = [];
  project_id: number;

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private route: ActivatedRoute
  ) {
    this.selectedService.getProjectObservable().subscribe(
      project => this.project_id = project.id
    )
  }

  ngOnInit() {
    let project: Project = this.selectedService.project;
    this.project_id = project.id;
    this.dataService.getIterations().then(
      iterations => {
        this.allIterations = iterations;
      }
    );
  }

  onSelect(iteration: Iteration) {
    this.selectedIteration = iteration;
  }

  delete() {
    this.iterations = this.dataService.deleteIteration(this.selectedIteration);
    this.selectedIteration = undefined;
  }

}
