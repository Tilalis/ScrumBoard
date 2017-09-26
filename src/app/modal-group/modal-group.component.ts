import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'modal-group',
  templateUrl: './modal-group.component.html',
  styleUrls: ['./modal-group.component.css']
})
export class ModalGroupComponent implements OnInit {
  @ContentChildren(ModalComponent) modals: QueryList<ModalComponent>

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showByRoute() {
    let url   : string         = this.router.url.slice(1);
    let modal : ModalComponent = this.modals.find(
      modal => {
        if (typeof modal.route === "string") {
          return modal.route == url;
        } else {
          return modal.route.indexOf(url) !== -1;
        }
    });

    modal.show();
  }
}
