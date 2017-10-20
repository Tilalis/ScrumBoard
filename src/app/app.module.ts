import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { StubComponent } from './stub/stub.component';
import { BoardComponent } from './board/board.component';
import { BoardCardComponent } from './board-card/board-card.component';
import { DataService } from './data.service';
import { SelectedService } from './selected.service';
import { UserService } from './user.service';
import { IterationManagerComponent } from './iteration-manager/iteration-manager.component';
import { IterationAddComponent } from './iteration-add/iteration-add.component';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ModalComponent } from './modal/modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { IterationListComponent } from './iteration-list/iteration-list.component';
import { IterationItemAddComponent } from './iteration-item-add/iteration-item-add.component';
import { BacklogComponent } from './backlog/backlog.component';
import { ModalGroupComponent } from './modal-group/modal-group.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectManagerComponent,
    ProjectAddComponent,
    ProjectListComponent,
    StubComponent,
    BoardComponent,
    BoardCardComponent,
    IterationManagerComponent,
    IterationAddComponent,
    ModalComponent,
    LoginModalComponent,
    IterationListComponent,
    IterationItemAddComponent,
    BacklogComponent,
    ModalGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragulaModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    DataService,
    SelectedService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
