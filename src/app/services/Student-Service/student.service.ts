import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Student } from '../../Model/student.model';
import { Account } from '../../Model/account.model';
import { DatabaseService } from '../database.service';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  updateProfile(arg0: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth, 
    private router: Router,private accountService: AccountService,
     private dbs: DatabaseService, private toastController: ToastController) { }
  SignIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {  
      //We get student data
      this.afs.collection("Student").doc(res.user.uid).valueChanges().subscribe(data =>{
        // set student data      
        let student = new Student(res.user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"], data["imgURL"]);
        //create account object that has sign state and student object
        let account = new Account(true, student);
        //set Account service to keep account object
        this.accountService.setAccount(account);
        this.dbs.getEnrolledCourses();
        this.dbs.getStudentsAnnouncements();
        this.router.navigateByUrl("main/account");
      })
    
     // console.log( 'Signin success');
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
  RegisterUser(name: string, surname: string, gender: string, phone: string, email: string, password: string) {
    //return this.afa.createUserWithEmailAndPassword(email, password);
    return this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Student").doc(id).set({
        firstname: name,
        lastname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
       this.router.navigateByUrl('account');

       // alert("Your account is succesfully created!");
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
  update_student(recordID, student) {
    return this.afs.doc('Student/' + recordID).update(student).then(res=>{
      //Successfull update
    }).catch(async error =>{
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })

      toast.present()
    })
  }
  getEnrolledCourses(userID){
    return this.afs.collection('EnrolledCourse', ref => ref.where('student_id','==', userID)).snapshotChanges();
  }
  //==========================================================
   // Sign-out 
   SignOut() {
    return this.afa.signOut().then(() => {  
      this.router.navigate(['account']); 
    })
  }

}
