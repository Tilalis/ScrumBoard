import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { IterationItem } from '../iteration-item';

@Component({
  selector: 'board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {
  @Input() iterationItem: IterationItem;
  @Input() index: number;

  constructor (private dataService: DataService) { }

  ngOnInit() {
  }

  delete() {
    this.dataService.deleteIterationItem(this.iterationItem);
    this.dataService.deleteIterationItemFromBacklog(this.iterationItem);
  }

  toggleBacklog() {
    if (this.dataService.isIterationItemBacklog(this.iterationItem)) {
      this.dataService.addIterationItem(this.iterationItem);
      this.dataService.deleteIterationItemFromBacklog(this.iterationItem);
    } else {
      this.dataService.addIterationItemToBacklog(this.iterationItem);
      this.dataService.deleteIterationItem(this.iterationItem);
    }

  }
}
