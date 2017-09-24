import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {
  @Input() name: string;
  @Input() text: string;
  @Input() storyPoints: number;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
