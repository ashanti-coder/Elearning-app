import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularinstructorsPage } from './popularinstructors.page';

const routes: Routes = [
  {
    path: '',
    component: PopularinstructorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularinstructorsPageRoutingModule {}
