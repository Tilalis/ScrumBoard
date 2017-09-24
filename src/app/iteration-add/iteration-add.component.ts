import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { Iteration } from '../iteration'

@Component({
  selector: 'iteration-add',
  templateUrl: './iteration-add.component.html',
  styleUrls: ['./iteration-add.component.css']
})
export class IterationAddComponent implements OnInit {
  @Input() title: string = "Add";
  @Input() iterations: Iteration[] = [];

  iterationName: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
  }

  addIteration(iterationName: string): void {
    if (iterationName !== "") {
      let iteration: Iteration = new Iteration(0, iterationName);
      this.dataService.addIteration(iteration);
      this.iterationName = "";
    }
  }
}
