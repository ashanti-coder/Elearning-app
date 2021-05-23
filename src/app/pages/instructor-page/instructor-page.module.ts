import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InstructorPagePageRoutingModule } from './instructor-page-routing.module';
import { InstructorPagePage } from './instructor-page.page';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
    InstructorPagePageRoutingModule,
    AngularMaterialModule,
    MatIconModule,

  ],
  declarations: [InstructorPagePage,ProfileComponent,LoginComponent,SignupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InstructorPagePageModule {}
