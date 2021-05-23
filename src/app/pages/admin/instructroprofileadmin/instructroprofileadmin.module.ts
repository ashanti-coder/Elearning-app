import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructroprofileadminPageRoutingModule } from './instructroprofileadmin-routing.module';

import { InstructroprofileadminPage } from './instructroprofileadmin.page';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructroprofileadminPageRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [InstructroprofileadminPage]
})
export class InstructroprofileadminPageModule {}
