import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorpanelPage } from './instructorpanel.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorpanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorpanelPageRoutingModule {}
