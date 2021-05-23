import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/pages/instructorpages/account/services/authentication.service';


import { Component, OnInit,ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Instructor } from 'src/app/Model/instructor';
import { InstructorClass } from 'src/app/Model/Instructor-Model/instructor';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { EnrolledCourse } from 'src/app/Model/EnrolledCourse';
import { Student } from 'src/app/Model/student.model';
import { DatabaseService } from 'src/app/services/database.service';
import { Account } from 'src/app/Model/Instructor-Model/account.model';
import { InstructorService } from 'src/app/services/Instructor-Service/instructor.service';
import { AccountService } from 'src/app/services/Instructor-Service/account.service';
import  firebase from 'firebase/app';
import { StudentInfo } from 'src/app/Model/Student-Model/student_Info';
import { StudentClass } from 'src/app/Model/Student-Model/student';
import { InstructorInfo } from 'src/app/Model/Instructor-Model/instructor_Info';

import { AngularMaterialModule  } from 'src/app/angular-material.module';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-instructorpanel',
  templateUrl: './instructorpanel.page.html',
  styleUrls: ['./instructorpanel.page.scss'],
})
export class InstructorpanelPage implements OnInit {

//For students
displayedColumnsStudents: string[] = ['studentId', 'firstname', 'lastname', 'gender', 'phone', 'email',];

students: Student[] = [];

studentsForSelectedCourse: Student[] = [];

studentDataSource: MatTableDataSource<Student>;

tempVar2: Student[] = [];

@ViewChild(MatPaginator) studentsPaginator: MatPaginator;

@ViewChild(MatSort) studentsSort: MatSort;

//For courses
displayedColumnsCourses: string[] = ['id', 'name', 'category', 'numberStudentsErrolled',  'action'];

courses: Course[] = [];

tempVar: Course[] = [];

@ViewChild(MatPaginator) coursesPaginator: MatPaginator;
coursesDataSource: MatTableDataSource<Course>;

@ViewChild(MatSort) coursesSort: MatSort;

id:string;
loggedIn: boolean = false;

userAccount: Account;
student: Instructor;

studentAccount: StudentClass;
user = {} as StudentInfo;
  constructor(
    public loadingCtrl: LoadingController,
    private auth: AngularFireAuth,private authService: AuthenticationService,
    private afs:AngularFirestore, 
    private accountService: AccountService,
    private router:Router,
    private dbs: DatabaseService,private instructorDao:InstructorService ) {
      this.studentAccount = new StudentClass();
      this.userAccount =  this.accountService.getAccount();   
      this.getCourses(this.studentAccount.getStudentNumber());
      this.getUser();
      this.loggedIn = false;
    }
    ngOnInit() { 
      this.auth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.setUserAccount();
        this.getCourses(user.uid);      
      } else {
          this.loggedIn = false;
        }
      })     
      this.getCourses(this.studentAccount.getStudentNumber());
    }
    setUserAccount(){
      let userID = firebase.auth().currentUser.uid.toString();
      this.afs.collection("Instructor").doc(userID).valueChanges().subscribe(data =>{   
       // set student data      
       this.user.studentId = userID;
       this.user.firstname = data["name"];
       this.user.lastname =  data["surname"];
       this.user.phone = data["phone"];
       this.user.gender = data["gender"];
       this.user.email =  data["email"];
       this.studentAccount.overloadStudent(
         this.user.studentId,
         this.user.firstname,
         this.user.lastname,
         this.user.phone,
         this.user.gender,
         this.user.email);
     })
   }
    getUser(){
      this.auth.authState.subscribe(user => {
        if (user) {
          this.afs.collection("Instructor").doc(user.uid).valueChanges().subscribe(data =>{
            // set student data
            let student = new Instructor(user.uid,data["name"], data["surname"], data["phone"],data["gender"], data["email"]);
            //create account object that has sign state and student object
            let userAccount = new Account(true, student);
            //set Account service to keep account object
            this.accountService.setAccount(userAccount);
          })
          this.loggedIn = true;
            } else {
          this.loggedIn = false;
        }
      })
    }
    getCourses(id){
      this.dbs.getInstructorCourses(id).subscribe(data =>{
        data.forEach(coursedata => {
          let tempvar = coursedata.payload.doc.data();
  
          let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
          tempvar["imgURL"], tempvar["category"], tempvar["instructor_id"], tempvar['numberStudentsErrolled']);
          
          if(!this.search(course)){
            this.courses.push(course);
            this.getAllStudents(course.id);
            this.coursesDataSource = new MatTableDataSource(this.courses);
            this.coursesDataSource.sort = this.coursesSort;
            this.coursesDataSource.paginator = this.coursesPaginator;
          }
          
          
      });
      
  
    });
  
      this.coursesDataSource = new MatTableDataSource(this.courses);
     this.coursesDataSource.sort = this.coursesSort;
     this.coursesDataSource.paginator = this.coursesPaginator;
  
  }
  getAllStudents(courseid){
    this.dbs.getEnrolledCourseAdmim(courseid).subscribe(data =>{
      data.forEach( encoursedata => {
        let tempvar = encoursedata.payload.doc.data();
  
        let enrcourse = new EnrolledCourse(encoursedata.payload.doc.id, tempvar['student_id'], tempvar['course_id']);
        
        this.dbs.getEnrolledCourseStudentAdmin(enrcourse.student_id).subscribe( studentdata => {
          let tempvar = studentdata.payload.data();
  
          let student = new Student(studentdata.payload.id, tempvar['firstname'], tempvar['lastname'],
          tempvar['gender'], tempvar['phone'], tempvar['email']);
  
          if(!this.searchStudent(student))
            this.students.push(student);
  
            this.studentDataSource = new MatTableDataSource(this.students);
            this.studentDataSource.sort = this.studentsSort;
            this.studentDataSource.paginator = this.studentsPaginator;
        })
        
        
        
    });
  
  });
  
  }
    search(course: Course): boolean{
      for(let temcourse of this.courses){
        if(temcourse.id == course.id){
          return true;
        }
      }
  
      return false;
    }
    searchStudent(student: Student): boolean{
      for(let tempstud of this.students){
        if(tempstud.getStudentNumber() == student.getStudentNumber()){
          return true;
        }
      }
  
      return false;
    }
    navigateToCourseStudents(course_id, name){
  
      this.router.navigate(['./adminpanel/coursestudents'], {queryParams: {"course_id": course_id, "name": name}});
      
    }
    
  signOut(){
    this.presentLoading();
    if (window.confirm('Do you really want to Sign-Out?')) {  
        firebase.auth().signOut();
        this.auth.signOut();
        this.authService.SignOut();
        this.router.navigateByUrl('/sign-in-instructor');
    }
  }
async presentLoading() {
  const loader = this.loadingCtrl.create({
    message: "signing out....",
    duration: 3000,
  });
  (await loader).present();
}
}
