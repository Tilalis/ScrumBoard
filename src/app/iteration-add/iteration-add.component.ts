import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../data.service';
import { Iteration } from '../iteration'

@Component({
  selector: 'iteration-add',
  templateUrl: './iteration-add.component.html',
  styleUrls: ['./iteration-add.component.css']
})
export class IterationAddComponent implements OnInit {
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Input() title: string = "Add";
  @Input() iterations: Iteration[] = [];

  iterationName: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
  }

  addIteration(iterationName: string): void {
    if (iterationName !== "") {
      let iteration: Iteration = new Iteration(iterationName);
      this.dataService.addIteration(iteration);
      this.iterationName = "";
      this.add.emit(null);
    }
  }
}
