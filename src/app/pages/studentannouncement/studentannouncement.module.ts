import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentannouncementPageRoutingModule } from './studentannouncement-routing.module';

import { StudentannouncementPage } from './studentannouncement.page';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentannouncementPageRoutingModule,
    MatExpansionModule,
    MatIconModule
  ],
  declarations: [StudentannouncementPage]
})
export class StudentannouncementPageModule {}
