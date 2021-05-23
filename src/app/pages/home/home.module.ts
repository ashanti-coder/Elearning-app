import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { LatestcoursesPage } from '../latestcourses/latestcourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [HomePage,LatestcoursesPage]
})
export class HomePageModule {}
