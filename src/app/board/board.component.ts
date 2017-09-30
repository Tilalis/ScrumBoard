import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { DataService } from '../data.service';
import { SelectedService } from '../selected.service';
import { Iteration } from '../iteration';
import { IterationItem } from '../iteration-item';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [
    DragulaService
  ]
})
export class BoardComponent implements OnInit {
  iteration: Iteration;
  iteration_name: string;

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private router: Router,
    private dragulaService: DragulaService
  ) {
    this.selectedService.getIterationObservable().subscribe(
      iteration => this.iteration = iteration
    );
  }

  ngOnInit() {
    this.iteration = this.selectedService.iteration;

    if (this.iteration === undefined) {
      alert('You must choose iteration first!');
      this.router.navigate(['iteration']);
    }

    this.dragulaService.drop.subscribe((value) => {
      this.onDrop(value);
    });
  }

  private onDrop(args) {
    let [bag, element, next, prev] = args;
    let index = element.id;
    let iterationItem: IterationItem = this.iteration[prev.id][index];

    this.dataService.deleteIterationItemFrom(iterationItem, prev.id);
    this.dataService.addIterationItemTo(iterationItem, next.id);
  }

}
