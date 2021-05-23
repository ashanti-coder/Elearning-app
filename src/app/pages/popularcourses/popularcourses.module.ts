import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularcoursesPageRoutingModule } from './popularcourses-routing.module';

import { PopularcoursesPage } from './popularcourses.page';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularcoursesPageRoutingModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [PopularcoursesPage]
})
export class PopularcoursesPageModule {}
