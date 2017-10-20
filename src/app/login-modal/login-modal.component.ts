import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { User } from '../user';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent extends ModalComponent implements OnInit {
  public user: User = new User("","");

  constructor (
    private userService: UserService,
    private dataService: DataService
  ) {
    super();
  }

  login() {
    this.userService.setUser(this.user);
    this.dataService.authorize();
    this.dataService.check().then((checked) => {
      if (checked) {
        this.hide();
      }
    })
    .catch((err) => {
      this.user.name = "";
      this.user.password = "";
    });
  }

  ngOnInit() {
  }

  hide() {
    if (this.userService.isLogined()) {
      super.hide();
    }
  }

}
