import {  NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./AppRoutingModule";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPage } from './pages/main/main.page';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import {MatMenuModule} from '@angular/material/menu';
import { AdminpanelPage } from './pages/admin/adminpanel/adminpanel.page';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularMaterialModule } from './angular-material.module';
import { InstructorpanelPage } from './pages/instructorpages/instructorpanel/instructorpanel.page';
import { InstructorPagePage } from './pages/instructor-page/instructor-page.page';
import { AdminPage } from './pages/admin/admin/admin.page';
// import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [AppComponent, MainPage, AdminpanelPage, InstructorpanelPage, InstructorPagePage, AdminPage],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularMaterialModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatSidenavModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
