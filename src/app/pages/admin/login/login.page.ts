import { Route } from '@angular/compiler/src/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth, private router: Router,
     private ads: AdminService, private toastController: ToastController) { }

  ngOnInit() {
  }

  async signIn(email, password){
    this.afa.signInWithEmailAndPassword(email, password).then( userCredentails => {
      this.afs.collection("Admin").snapshotChanges().subscribe( async data =>{
        data.forEach(async admdata => {
          if(admdata.payload.doc.id == userCredentails.user.uid){
            this.ads.isAuthorised = true;
            this.router.navigateByUrl("admin/adminpanel");
          }else{
            let toast = await this.toastController.create({
              message: "User unauthorized",
              duration: 3000,
              color: "danger",
            })

            toast.present()

          }
        })
      })
      

    }).catch(async error => {
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })

      toast.present()
    });
  }



}
