import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatestcoursesPage } from './latestcourses.page';

const routes: Routes = [
  {
    path: '',
    component: LatestcoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LatestcoursesPageRoutingModule {}
