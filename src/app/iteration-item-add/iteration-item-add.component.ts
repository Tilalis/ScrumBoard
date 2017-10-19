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
  iterationItem: IterationItem;

  constructor(
    private dataService: DataService,
    private selectedService: SelectedService,
    private router: Router
  ) {
    this.iterationItem = new IterationItem("", "", 0);
  }

  ngOnInit() {
  }

  saveClick() {
    let route: string = this.router.url.slice(1);
    if (route === 'board') {
      this.dataService.deleteIterationItem(this.iterationItem);
      this.dataService.addIterationItem(this.iterationItem);
    } else {
      this.dataService.deleteIterationItemFromBacklog(this.iterationItem);
      this.dataService.addIterationItemToBacklog(this.iterationItem);
    }
    this.iterationItem = new IterationItem("", "", 0);
    this.add.emit(null);
  }

  setIterationItem(iterationItem: IterationItem) {
    this.iterationItem = iterationItem;
  }

}
