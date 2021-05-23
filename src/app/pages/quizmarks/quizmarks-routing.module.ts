import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizmarksPage } from './quizmarks.page';

const routes: Routes = [
  {
    path: '',
    component: QuizmarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizmarksPageRoutingModule {}
