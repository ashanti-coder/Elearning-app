import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    MatRadioModule,
    MatTabsModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
