import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentenrolledcoursePageRoutingModule } from './studentenrolledcourse-routing.module';

import { StudentenrolledcoursePage } from './studentenrolledcourse.page';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentenrolledcoursePageRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule
    
  ],
  declarations: [StudentenrolledcoursePage]
})
export class StudentenrolledcoursePageModule {}
