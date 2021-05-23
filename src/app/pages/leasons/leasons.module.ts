import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeasonsPageRoutingModule } from './leasons-routing.module';

import { LeasonsPage } from './leasons.page';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeasonsPageRoutingModule,
    MatTabsModule,
    MatListModule
  ],
  declarations: [LeasonsPage]
})
export class LeasonsPageModule {}
