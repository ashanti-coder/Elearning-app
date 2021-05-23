import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FeaturedCourse } from 'src/app/MockData/featured.mock';
import { LatestCourse } from 'src/app/MockData/latest.mock';
import { Course } from 'src/app/Model/course';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Account } from '../Model/account.model';
import { Student } from '../Model/student.model';
import { AccountService } from './account.service';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  loggedIn: boolean;
  homeView: boolean;
  featuredCourses = FeaturedCourse; 
  latestCourses = LatestCourse; 
  selectedC: Course;

  courses: Course[] = [];
  
  constructor(private firestore: AngularFirestore,
    private accountService:AccountService,
    private auth:AngularFireAuth) {
    //Just for testing home page and latest
    this.homeView = false;
    this.auth.authState.subscribe(user => {
      if (user) {
        this.setUser();
       } else {
      }
    })
   }
  // getFeaturedCourses(){
  //   if(this.homeView){
  //     return this.featuredCourses = this.featuredCourses.slice(0,3);
  //   }
  //   else{
  //         return this.featuredCourses;
  //   }
  // }
  // getLatestCourses(){
  //   if(this.homeView){
  //     return this.latestCourses = this.latestCourses.slice(0,3);
  //   }
  //   else{
  //     return this.latestCourses;
  //   }
  // }  
  selectCourse(selected)
  {
    this.selectedC = selected;
  }
  setUser(){
    let userID = firebase.auth().currentUser.uid.toString();
    if(userID!=null){
    this.firestore.collection("Student").doc(userID).valueChanges().subscribe(data =>{
      // set student data
      let student = new Student(userID, data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);
      // console.log(student)
      //create account object that has sign state and student object
      let account = new Account(true, student);
      //set Account service to keep account object
      this.accountService.setAccount(account);
      })
    }
    }
}
