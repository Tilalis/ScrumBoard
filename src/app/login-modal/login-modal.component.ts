import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../user.service';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent extends ModalComponent implements OnInit {
  public username: string;
  public password: string;

  constructor (private userService: UserService) {
    super();
  }

  login() {
    this.userService.login(this.username, this.password).then((logined) => {
      if (logined) {
        this.hide();
        localStorage.setItem('logined', 'true');
      }
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
