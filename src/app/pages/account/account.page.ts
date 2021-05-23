import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Account } from 'src/app/Model/account.model';
import { CourseService } from 'src/app/services/course.service';
import { Student } from 'src/app/Model/student.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from 'src/app/services/Student-Service/student.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  index = 0;
  hasSignedUp: boolean;
  loggedIn: boolean = false;
  userAccount:Account;
  student: Student;


  selected = 'other';
  type="login";
  submitError: string;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  isEdit : boolean = false;
 
  constructor(
    private accountService:AccountService, private courseDao: CourseService,private afs:AngularFirestore,
      private router: Router, private dbs: StudentService, private auth: AngularFireAuth) { 
 
    this.loggedIn = false;
    this.getUser();
  }
  ngOnInit() {
    
    this.auth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        
       } else {
        this.loggedIn = false;
      }
    })
    this.getUser();
    this.userAccount =  this.accountService.getAccount();
    console.log(this.userAccount);
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 10 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
getUser(){
  this.auth.authState.subscribe(user => {
    if (user) {
      this.afs.collection("Student").doc(user.uid).valueChanges().subscribe(data =>{
        // set student data
        this.student = new Student(user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"], data["imgURL"]);
        //create account object that has sign state and student object
        this.userAccount = new Account(true, this.student);
        //set Account service to keep account object
        this.accountService.setAccount(this.userAccount);
      })
      this.loggedIn = true;
        } else {
      this.loggedIn = false;
    }
  })
}
EditRecord(student) {
  console.log(student);
  this.isEdit = true;
  student.firstname = student.geteName();
  student.lastname = student.getSurname();
  student.gender = student.getGender();
  student.phone = student.getPhone();
  student.email = student.getEmail();
}
UpdateRecord(student) {
  if (window.confirm('You are updating your information?')) {    
  let record = {};
  record['firstname'] = student.firstname;
  record['gender'] = student.gender;
  record['lastname'] = student.lastname;
  record['phone'] = student.phone;
  record['email'] = student.email;
  console.log(record);
  this.accountService.setAccount(this.userAccount);
  this.dbs.update_student(student.getStudentNumber(), record);  
  this.isEdit = false;
  }
}
logout(){
  this.loggedIn = false;
  this.userAccount.setSignIn(false);
  this.accountService.setAccount(this.userAccount);
  this.auth.signOut();
}

}
