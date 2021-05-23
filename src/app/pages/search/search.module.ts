import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
