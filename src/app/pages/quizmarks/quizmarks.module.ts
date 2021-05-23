import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizmarksPageRoutingModule } from './quizmarks-routing.module';

import { QuizmarksPage } from './quizmarks.page';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizmarksPageRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule
  ],
  declarations: [QuizmarksPage]
})
export class QuizmarksPageModule {}
