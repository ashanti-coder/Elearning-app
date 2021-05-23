import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddlessonPage } from './addlesson.page';

const routes: Routes = [
  {
    path: '',
    component: AddlessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddlessonPageRoutingModule {}
