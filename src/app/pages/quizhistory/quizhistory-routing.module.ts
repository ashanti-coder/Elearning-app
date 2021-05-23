import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizhistoryPage } from './quizhistory.page';

const routes: Routes = [
  {
    path: '',
    component: QuizhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizhistoryPageRoutingModule {}
