import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountPage } from './account.page';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
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
    MatProgressSpinnerModule,
    AngularMaterialModule,

  ],
  declarations: [AccountPage,LoginComponent,SignupComponent]
})
export class AccountPageModule {}
