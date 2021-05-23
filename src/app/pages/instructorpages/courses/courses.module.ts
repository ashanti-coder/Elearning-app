import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursesPageRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    AngularFireAuthModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatIconModule,

  ],
  declarations: [CoursesPage]
})
export class CoursesPageModule {}
