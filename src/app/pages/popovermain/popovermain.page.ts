import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-popovermain',
  templateUrl: './popovermain.page.html',
  styleUrls: ['./popovermain.page.scss'],
})
export class PopovermainPage implements OnInit {

  loginStatus: boolean = false;



  constructor(public accountService: AccountService,
    public loadingCtrl: LoadingController,
    private auth: AngularFireAuth,
    private afs:AngularFirestore, private dbs: DatabaseService,
     private router: Router, public popoverController: PopoverController, public sp: SpinnerService) { }

  ngOnInit() {
    
  }

  signOut(){

      this.sp.isVisible = true; 
      this.auth.signOut().then(()=>{
        
        this.accountService.getAccount().setSignIn(this.loginStatus);
        this.accountService.setAccount(null);
        this.sp.isVisible = false;
        this.router.navigateByUrl("home")
        this.popoverController.dismiss();
        
        
      })
  }


}
