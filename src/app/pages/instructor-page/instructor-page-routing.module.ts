import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorPagePage } from './instructor-page.page';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '',component: InstructorPagePage },
  
  { path: 'profile',component: ProfileComponent},
  { path: 'login',component: LoginComponent},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorPagePageRoutingModule {}
