import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructroprofileadminPage } from './instructroprofileadmin.page';

const routes: Routes = [
  {
    path: '',
    component: InstructroprofileadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructroprofileadminPageRoutingModule {}
