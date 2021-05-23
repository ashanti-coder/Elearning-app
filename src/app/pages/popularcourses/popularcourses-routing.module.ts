import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularcoursesPage } from './popularcourses.page';

const routes: Routes = [
  {
    path: '',
    component: PopularcoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularcoursesPageRoutingModule {}
