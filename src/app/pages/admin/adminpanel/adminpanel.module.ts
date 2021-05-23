import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminpanelPageRoutingModule } from './adminpanel-routing.module';

import { AdminpanelPage } from './adminpanel.page';
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
    AdminpanelPageRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  declarations: [AdminpanelPage]
})
export class AdminpanelPageModule {}
