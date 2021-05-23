import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule

  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
