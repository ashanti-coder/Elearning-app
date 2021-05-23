import { Injectable, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';
//import { User } from "../../app/model/user";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, from } from 'rxjs';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileModel } from '../pages/profile/profile.model';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

//  userData : User;
  redirectResult: Subject<any> = new Subject<any>();
  public loggedIn: boolean;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router, 
    private toastController: ToastController,
    private storage: AngularFireStorage,
    //private share: ShareService,
  )
   {
     this.loggedIn = false;

   }
  // Login in with email/password
  
  signInWithEmail(email, password) {
    
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Your account is succesfully logged!");
      this.router.navigateByUrl('profile-instructor');
      this.loggedIn = true;
    }).catch(async error =>{
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })

      toast.present()
    });
  }
  // Register user with email/password
  signUpWithEmail(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
    .then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afStore.collection("Instructor").doc(id).set({
        id:id,
        name: "set name",
        surname: "Set surname",
        gender: "male",
        phone: "set phone",
        imageURL: "https://firebasestorage.googleapis.com/v0/b/elearningapp-ad47e.appspot.com/o/StudentProfile%2FVUrsNF8J6ufoZBvJYcACCIlzajf2?alt=media&token=062cabcb-e07f-4f11-9c14-fdcac6667332",
        email: userCredentials.user.email,
        boi: "Say something about yourself",
        address: "Add address",
      }).catch( async error => {
        let toast = await this.toastController.create({
          message: error.message,
          duration: 3000,
          color: "danger",
        })
  
        toast.present()

      }).catch( async error => {
        let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })

      toast.present()
      })
    }).catch( async error => {
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })

      toast.present()
    })
  }
  getUserInfo(userID){
    return this.afStore.collection('Instructor', ref => ref.where('id','==', userID)).snapshotChanges();
  }
  updateProfile(userID,file) {
    const filePath = userID;
    const ref = this.storage.ref("StudentProfile/" + filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe( finalize( () => {
  		ref.getDownloadURL().subscribe(url =>{
        this.afStore.collection("Instructor/").doc(userID).update({
          imageURL: url,
        }).then(() => {
          alert("Display photo successfully Updated!");
        }).catch(error => {
          alert(error.message)
        });
      })
  	})).subscribe()	
    
  }
  updateInfo(userID,profile: ProfileModel){
    this.afStore.collection("Instructor/").doc(userID).update({
      name: profile.name,
      surname: profile.surname,
      phone: profile.phone,
      boi: profile.boi,
      address: profile.address,
    }).then(() => {alert("Profile Updated!");}).catch(async error => {
      alert(error.message)
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })
      toast.present();
    });
  }


  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
        this.router.navigateByUrl('');
        this.loggedIn = true;
    }).catch((error) => {
      window.alert(error);
    })
  }
  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {  
      this.router.navigate(['sign-in-instructor']);
      this.loggedIn = false;
    })
  }
  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }

}