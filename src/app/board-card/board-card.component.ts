import { Component, OnInit, Input } from '@angular/core';

import { ModalComponent } from '../modal/modal.component';
import { IterationItemAddComponent } from '../iteration-item-add/iteration-item-add.component';

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
  @Input() editModal: ModalComponent;
  @Input() itemAdd: IterationItemAddComponent;

  constructor (private dataService: DataService) { }

  ngOnInit() {
    this.itemAdd.setIterationItem(this.iterationItem);
  }

  delete() {
    this.dataService.deleteIterationItem(this.iterationItem);
    this.dataService.deleteIterationItemFromBacklog(this.iterationItem);
  }

  edit() {
    this.editModal.show();
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
