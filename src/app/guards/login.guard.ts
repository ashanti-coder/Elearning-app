import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private ads: AdminService, private router: Router, private toastController: ToastController){
    
  }
  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean>{
  
    if(this.ads.isAuthorised){
    
      return true;
    }else{
     
      this.router.navigateByUrl("admin/login");
    }
    
    return false;
  }
  
}
