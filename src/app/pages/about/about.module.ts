import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    MatCardModule
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}
