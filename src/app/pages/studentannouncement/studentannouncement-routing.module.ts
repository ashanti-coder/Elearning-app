import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentannouncementPage } from './studentannouncement.page';

const routes: Routes = [
  {
    path: '',
    component: StudentannouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentannouncementPageRoutingModule {}
