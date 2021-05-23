import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeasonsPage } from './leasons.page';

const routes: Routes = [
  {
    path: '',
    component: LeasonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeasonsPageRoutingModule {}
