import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfilePage,AngularMaterialModule],
  providers: []
})
export class ProfilePageModule {}
