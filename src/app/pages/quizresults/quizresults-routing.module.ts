import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizresultsPage } from './quizresults.page';

const routes: Routes = [
  {
    path: '',
    component: QuizresultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizresultsPageRoutingModule {}
