import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddinstructorPageRoutingModule } from './addinstructor-routing.module';

import { AddinstructorPage } from './addinstructor.page';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddinstructorPageRoutingModule,
    MatButtonModule
  ],
  declarations: [AddinstructorPage]
})
export class AddinstructorPageModule {}
