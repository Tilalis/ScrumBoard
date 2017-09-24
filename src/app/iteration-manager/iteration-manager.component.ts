import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import { Iteration }  from '../iteration';

@Component({
  selector: 'iteration-manager',
  templateUrl: './iteration-manager.component.html',
  styleUrls: ['./iteration-manager.component.css']
})
export class IterationManagerComponent implements OnInit {
  @Input() title : string = "List";

  selectedIteration: Iteration;
  iterations: Iteration[] = [];
  project_id: number;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getIterations().then(
      iterations => {
        this.iterations = iterations;
      }
    );
    this.route.params.subscribe(params => {
       this.project_id = +params['project_id'];
    });
  }

  onSelect(iteration: Iteration) {
    this.selectedIteration = iteration;
  }

  delete() {
    this.iterations = this.dataService.deleteIteration(this.selectedIteration);
    this.selectedIteration = undefined;
  }

}
