import { Component, OnInit, Output, EventEmitter} from '@angular/core';

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
    private selectedService: SelectedService
  ) { }

  ngOnInit() {
  }

  addClick() {
    let iterationItem: IterationItem = new IterationItem(this.name, this.description, this.storyPoints);
    this.dataService.addIterationItem(
      new IterationItem(this.name, this.description, this.storyPoints)
    );
    this.name = "";
    this.description = "";
    this.storyPoints = 0;
    this.add.emit(null);
  }

}
