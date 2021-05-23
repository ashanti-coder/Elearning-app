import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopovermainPageRoutingModule } from './popovermain-routing.module';

import { PopovermainPage } from './popovermain.page';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopovermainPageRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
    
  ],
  declarations: [PopovermainPage]
})
export class PopovermainPageModule {}
