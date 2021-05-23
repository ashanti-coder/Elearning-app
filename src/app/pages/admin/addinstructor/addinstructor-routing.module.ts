import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddinstructorPage } from './addinstructor.page';

const routes: Routes = [
  {
    path: '',
    component: AddinstructorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddinstructorPageRoutingModule {}
