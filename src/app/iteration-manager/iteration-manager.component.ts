import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  iterations: Iteration[] = [];

  constructor(
    private selectedService: SelectedService,
    private dataService: DataService,
    private router: Router
  ) {
    this.selectedService.getProjectObservable().subscribe(
      project => {
        this.iterations = project.iterations;
      }
    )
  }

  ngOnInit() {
    let project: Project = this.selectedService.project;

    if (project !== undefined) {
      this.iterations = project.iterations;
    } else {
      alert('You must select Project first!');
      this.router.navigate(['projects']);
    }


  }

  onSelect(iteration: Iteration) {
    this.selectedIteration = iteration;
  }

  delete() {
    this.dataService.deleteIteration(this.selectedIteration);
    this.selectedIteration = undefined;
  }

}
