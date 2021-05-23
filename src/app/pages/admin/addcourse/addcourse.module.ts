import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcoursePageRoutingModule } from './addcourse-routing.module';

import { AddcoursePage } from './addcourse.page';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcoursePageRoutingModule,
    MatButtonModule,
  
  ],
  declarations: [AddcoursePage]
})
export class AddcoursePageModule {}
