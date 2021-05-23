import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizresultsPageRoutingModule } from './quizresults-routing.module';

import { QuizresultsPage } from './quizresults.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizresultsPageRoutingModule
  ],
  declarations: [QuizresultsPage]
})
export class QuizresultsPageModule {}
