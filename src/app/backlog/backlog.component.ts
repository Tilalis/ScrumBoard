import { Component, OnInit } from '@angular/core';

import { SelectedService } from '../selected.service';
import { DataService } from '../data.service';
import { IterationItem } from '../iteration-item';

@Component({
  selector: 'backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  backlog: IterationItem[];

  constructor (
    private selectedService: SelectedService
  ) { }

  ngOnInit() {
    this.backlog = this.selectedService.project.backlog;
  }

}
