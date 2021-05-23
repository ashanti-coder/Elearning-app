import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AngularMaterialModule } from "../../../angular-material.module";
import { AddlessonPageRoutingModule } from './addlesson-routing.module';

import { AddlessonPage } from './addlesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlessonPageRoutingModule,
    AngularMaterialModule
  ],
  declarations: [AddlessonPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddlessonPageModule {}
