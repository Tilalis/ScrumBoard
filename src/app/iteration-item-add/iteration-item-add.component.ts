import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { SelectedService } from '../selected.service';

import { IterationItem } from '../iteration-item';

@Component({
  selector: 'iteration-item-add',
  templateUrl: './iteration-item-add.component.html',
  styleUrls: ['./iteration-item-add.component.css']
})
export class IterationItemAddComponent implements OnInit {
  @Output() add: EventEmitter<any> = new EventEmitter();
  name: string;
  description: string;
  storyPoints: number;

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addClick() {
    let iterationItem: IterationItem = new IterationItem(this.name, this.description, this.storyPoints);
    let route: string = this.router.url.slice(1);
    if (route === 'board') {
      this.dataService.addIterationItem(iterationItem);
    } else {
      this.dataService.addIterationItemToBacklog(iterationItem);
    }
    this.name = "";
    this.description = "";
    this.storyPoints = 0;
    this.add.emit(null);
  }

}
