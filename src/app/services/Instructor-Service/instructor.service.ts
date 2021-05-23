import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AccountService } from '../Instructor-Service/account.service';
import { Student } from '../../Model/student.model';
import { Account } from '../../Model/Instructor-Model/account.model';
import { DatabaseService } from '../database.service';
import { InstructorClass } from 'src/app/Model/Instructor-Model/instructor';
import firebase from 'firebase/app';
import { Instructor } from 'src/app/Model/instructor';
import { InstructorInfo } from 'src/app/Model/Instructor-Model/instructor_Info';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  user = {} as InstructorInfo;
  instructor = new InstructorClass;

  //Upload Document
  image: Observable<any>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  lessonName: Observable<any>;
  lessonType: string;
  //Upload video
  image_V: Observable<any>;
  uploadPercent_V: Observable<number>;
  downloadURL_V: Observable<any>;

  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth, 
    private router: Router,
    private accountService: AccountService,
   private dbs: DatabaseService,
   
   private storage: AngularFireStorage,
   ) {this.instructor = new InstructorClass();}

     uploadFile(event,name,lname,type) {
       this.lessonType = type;
      const file = event.target.files[0];
      const filename = file.name;
      const fileExt = filename.split('.').pop();
      const filePath = name + "/" + lname + '.' + fileExt;
      const fileRef = this.storage.ref(`StudyMaterial/${filePath}`);
      const task = this.storage.upload(`StudyMaterial/${filePath}`, file);
  
      this.uploadPercent = task.percentageChanges();
  
      task.snapshotChanges().pipe(
        finalize(() => this.downloadURL =  fileRef.getDownloadURL())
      ).subscribe()
    
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            this.image = downloadURL;
            });
        })
       )
    .subscribe()
    }
    uploadVideo(event,name, lname) {
      const file = event.target.files[0];
      const filename = file.name;
      const fileExt = filename.split('.').pop();
      const filePath =   name +"/" + lname + '.' + fileExt;
      const fileRef = this.storage.ref(`LessonsVideos/${filePath}`);
      const task = this.storage.upload(`LessonsVideos/${filePath}`, file);
  
      this.uploadPercent_V = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => this.downloadURL_V =  fileRef.getDownloadURL())
      ).subscribe()
    
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL_V => {
            this.image_V = downloadURL_V;
            //video
            });
        })
       )
    .subscribe()
    }
    //Uploaded method
    uploadItem(_name,_course_id,_number) {
      window.alert(_name + " lesson has been uploaded successfully!");
      let id = this.afs.createId();

      this.afs.collection('Lesson').doc(id).set({
        course_id: _course_id,
        name: _name,
        number: _number + 1,
        date: new Date().toLocaleString(),
        lessonType: this.lessonType,
        docURL: this.image,
      }).catch(error => {
        console.log("not added error ->" + error);
      }).then(() => {  
      })
    }
    uploadItemV(_name,_course_id,_number) {
      window.alert(_name + " lesson has been uploaded successfully!");
      let id = this.afs.createId();

      this.afs.collection('Lesson').doc(id).set({
        course_id: _course_id,
        name: _name,
        number: _number + 1,
        date: new Date().toLocaleString(),
        lessonType: "Video",
        videoURL: this.image_V
      }).catch(error => {
        console.log("not added error ->" + error);
      }).then(() => {  
      })
    }
    getCourseLessons(id) {
      return this.afs.collection('Lesson',ref => ref.where("course_id","==",id)).snapshotChanges();
  }
  deleteLesson(Id: string){
    this.afs.doc('Lesson/' + Id).delete();
}
    // uploadImage(event){
    //   const file = event.target.files[0];
    //   const filePath = 'images' + this.makeid(3);
    //   const fileRef = this.storage.ref(filePath);
    //   const task = this.storage.upload(filePath,file);
      
    //   //const task1 = fileRef.put(file);
    //   //Observe percentage changes
    //   this.uploadPercent = task.percentageChanges();
    //   task.snapshotChanges().pipe(
    //     finalize(() => this.downloadURL =  fileRef.getDownloadURL())
    //   ).subscribe()
    //   return this.uploadPercent;
    // }
    // makeid(length){
    //   var result ='';
    //   var characters ='ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //   var charactersLength = characters.length;
    //   for(var i =0; i < length; i++){
    //     result += characters.charAt(Math.random()* charactersLength);
    //   }
    //   return result;
    // }












  SignIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {  
          //create account object that has sign state and student object
    //We get student data
      this.afs.collection("Instructor").doc(res.user.uid).valueChanges().subscribe(data =>{
        // set student data      
      this.instructor.overloadStudent(res.user.uid,data["name"], data["name"], data["phone"],data["gender"], data["email"]);
      this.setUser();
      })
     // this.router.navigateByUrl("home");
     // console.log( 'Signin success');
    }).catch(error =>{
      alert(error)
    });
  }
  // Register user with email/password
  RegisterUser(name: string, surname: string, gender: string, phone: string, email: string, password: string) {
    //return this.afa.createUserWithEmailAndPassword(email, password);
    return this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Instructor").doc(id).set({
        name: name,
        surname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
       this.router.navigateByUrl('sign-in');

       // alert("Your account is succesfully created!");
      }).catch( error => {
        alert(error)
      }).catch( error => {
        alert(error)
      })
    }).catch(error => {
      alert(error);
    })
  }
  setUser(){
    let userID = firebase.auth().currentUser.uid.toString();
    if(userID!=null){
    this.afs.collection("Instructor").doc(userID).valueChanges().subscribe(data =>{
      // set student data
      let student = new Instructor(userID, data["name"], data["surname"], data["phone"],data["gender"], data["email"]);
      console.log(student)
      //create account object that has sign state and student object
      let account = new Account(true, student);
      console.log(account);
      //set Account service to keep account object
      this.accountService.setAccount(account);
      })
    }
}
  update_student(recordID, instructor) {
    return this.afs.doc('Instructor/' + recordID).update(instructor).then(res=>{
      //Successfull update
    }).catch(error =>{
      alert(error);
    })
  }
  getEnrolledCourses(userID){
    return this.afs.collection('EnrolledCourse', ref => ref.where('instructor_id','==', userID)).snapshotChanges();
  }
  getInstructorInfo(userID){
    return this.afs.collection('Instructor', ref => ref.where('id','==', userID)).snapshotChanges();
  }
  //==========================================================
  // Sign-out 
   SignOut() {
    return this.afa.signOut().then(() => {  
      this.router.navigate(['account']); 
    })
  }



}
