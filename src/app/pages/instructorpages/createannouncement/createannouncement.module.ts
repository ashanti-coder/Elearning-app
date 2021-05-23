import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateannouncementPageRoutingModule } from './createannouncement-routing.module';

import { CreateannouncementPage } from './createannouncement.page';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateannouncementPageRoutingModule,
    MatRadioModule
  ],
  declarations: [CreateannouncementPage]
})
export class CreateannouncementPageModule {}
