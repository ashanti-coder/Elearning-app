import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizhistoryPageRoutingModule } from './quizhistory-routing.module';

import { QuizhistoryPage } from './quizhistory.page';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizhistoryPageRoutingModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule
  ],
  declarations: [QuizhistoryPage]
})
export class QuizhistoryPageModule {}
