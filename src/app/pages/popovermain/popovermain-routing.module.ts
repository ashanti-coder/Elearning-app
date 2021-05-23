import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopovermainPage } from './popovermain.page';

const routes: Routes = [
  {
    path: '',
    component: PopovermainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopovermainPageRoutingModule {}
