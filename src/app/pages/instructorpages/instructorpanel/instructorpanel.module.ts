import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorpanelPageRoutingModule } from './instructorpanel-routing.module';

import { InstructorpanelPage } from './instructorpanel.page';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorpanelPageRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  declarations: [InstructorpanelPage]
})
export class InstructorpanelPageModule {}
