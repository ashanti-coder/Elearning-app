import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseinrolledPageRoutingModule } from './courseinrolled-routing.module';

import { CourseinrolledPage } from './courseinrolled.page';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseinrolledPageRoutingModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [CourseinrolledPage]
})
export class CourseinrolledPageModule {}
