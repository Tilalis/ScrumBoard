import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StubComponent } from '../stub/stub.component';
import { BoardComponent } from '../board/board.component';
import { ProjectManagerComponent } from '../project-manager/project-manager.component';
import { IterationManagerComponent } from '../iteration-manager/iteration-manager.component';

const routes: Routes = [
  { path: '', component: StubComponent },
  { path: 'iteration', component: IterationManagerComponent },
  { path: 'board', component: BoardComponent },
  { path: 'projects', component: ProjectManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
