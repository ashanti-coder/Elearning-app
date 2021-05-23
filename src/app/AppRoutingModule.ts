import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from './app-routing.module';


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
