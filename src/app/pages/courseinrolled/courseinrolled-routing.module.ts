import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseinrolledPage } from './courseinrolled.page';

const routes: Routes = [
  {
    path: '',
    component: CourseinrolledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseinrolledPageRoutingModule {}
