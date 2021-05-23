import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentenrolledcoursePage } from './studentenrolledcourse.page';

const routes: Routes = [
  {
    path: '',
    component: StudentenrolledcoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentenrolledcoursePageRoutingModule {}
