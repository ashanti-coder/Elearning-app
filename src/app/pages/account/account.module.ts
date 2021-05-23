import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { MyProfileComponent } from 'src/app/pages/account/my-profile/my-profile.component';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  declarations: [AccountPage,LoginComponent,SignupComponent,MyProfileComponent]
  
})  
export class AccountPageModule {}
