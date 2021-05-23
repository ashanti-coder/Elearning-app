import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursedetailsPageRoutingModule } from './coursedetails-routing.module';

import { CoursedetailsPage } from './coursedetails.page';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursedetailsPageRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [CoursedetailsPage]
})
export class CoursedetailsPageModule {}
