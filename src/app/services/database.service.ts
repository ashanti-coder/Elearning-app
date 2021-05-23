import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection, DocumentChange, DocumentChangeAction } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

import { Account } from '../Model/account.model';
import { Course } from '../Model/course';
import { EnrolledCourse } from '../Model/enrolledcourse.model';
import { Lesson } from '../Model/lesson.mode';
import { Student } from '../Model/student.model';
import { CoursedetailsPage } from '../pages/coursedetails/coursedetails.page';
import { AccountService } from './account.service';

import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Announcement } from '../Model/announcement.model';
import { QuizHistory } from '../Model/quizhistory.model';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { CourseService } from './course.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
 
  
 
  // Login user with email/password

  collectionNameStudent = 'Students';

  userAccount: Account;

  private loggedIn: boolean;

  collectionName = 'Course';

  coursesList: Course[] = [];

  lessonsList: Lesson[] = [];

  courses: Course[] = [];

  studentAnnouncement: Announcement[] = [];

  totalNewAnnouncement: number = 0;

  //This variable is used by admin to get studets for selected course on instructor page
  students: Student[] = [];

  constructor(private sp: SpinnerService, private afs: AngularFirestore,
     private afa: AngularFireAuth, 
     private router: Router,private accountService: AccountService,private storage: AngularFireStorage,
     private cs: CourseService, private toastController: ToastController) {
      // this.setUser();
    }
    setUser(){
      let userID = firebase.auth().currentUser.uid.toString();
      if(userID!=null){
      this.afs.collection("Student").doc(userID).valueChanges().subscribe(data =>{
        // set student data
        let student = new Student(userID, data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"], data["imgURL"]);
        console.log(student)
        //create account object that has sign state and student object
        let account = new Account(true, student);
        console.log(account);
        //set Account service to keep account object
        this.accountService.setAccount(account);
        })
      }
  }
  
  getInstructor(userID){
    return this.afs.collection('Instructor', ref => ref.where('userID','==', userID)).snapshotChanges();
  }
// get enrolled courses from database
  public getEnrolledCourses(){

    // A query to select enrolled courses for a specific student
    this.afs.collection("EnrolledCourse", ref => 
    ref.where("student_id", "==", this.accountService.getAccount()
    .getStudent().getStudentNumber())).snapshotChanges().subscribe(enrolledcoursesdata =>{
      let tempvar: Course[] = [];
        
        //Using foreach method on enrolledcoursesdata to loop and get each enrolled course
      enrolledcoursesdata.forEach( enrcourse =>{

        //Get lessons for a course by calling getLesson method that accepts course id as parameter

       this.getLessons(enrcourse.payload.doc.data()["course_id"]);

        //We used each course id from enrolled courses to get actual course data from Course collection

        this.afs.collection("Course").doc(enrcourse.payload.doc.data()["course_id"]
        ).snapshotChanges().subscribe( coursedata =>{

          //Assigning course data to data binding
          let data = coursedata.payload.data();
         

          let course = new Course(coursedata.payload.id, data["name"], data["ratings"],
          data["imgURL"], data["category"], data["price"], data["instructor_id"]);

          
          
          //Loading enrolled courses list with Enrolled course object which also takes the actual course data
          this.coursesList.push(course);
         
          
          
          
        })

       

       
      })

        
        

    });
  }
// Get lessons for selected enrolled courses
  public getLessons(course_id: string){

    

    this.afs.collection("Lesson", ref => ref.where("course_id", "==", course_id),)

    .snapshotChanges().subscribe( lessonsdata =>{

      for(let lesson of lessonsdata){

        this.afs.collection("QuizHistory", ref => ref.where("student_id", "==" , 
        this.accountService.getAccount().getStudent().getStudentNumber())).snapshotChanges().
        subscribe(data => {
          
            let ls = new Lesson(lesson.payload.doc.id, 
            lesson.payload.doc.data()["name"], lesson.payload.doc.data()["number"],
            lesson.payload.doc.data()["videoURL"], lesson.payload.doc.data()["docURL"],
            lesson.payload.doc.data()["date"], lesson.payload.doc.data()["course_id"]);

          if(this.searchLesson(data, lesson.payload.doc.id)){

            ls.isWritten = true;

          }else{
              ls.isWritten = false;
          }

          this.lessonsList.push(ls);
        })
       
      }
      
    })
  
  }

  searchLesson(writtenqQuizes: DocumentChangeAction<unknown>[], lesson_id): boolean{

    for(let wq of writtenqQuizes){
      if(wq.payload.doc.data()["lesson_id"] == lesson_id){
        
        return true;
      }
    }

    return false;
  }
  update_student(recordID, student) {
    this.afs.doc('Student/' + recordID).update(student);
    this.setUser();
  }
   // Sign-out 
   SignOut() {
    return this.afa.signOut().then(() => {  
      //this.router.navigate(['']);
      this.userAccount.setSignIn(false);
      this.accountService.setAccount(this.userAccount);
      
    })
  }
  //Method to retrieve all courses for admin
  getCourses(){
    return this.afs.collection("Course").snapshotChanges();
  }


  getAllStudentsAdmim(){

    return this.afs.collection("Student").snapshotChanges();

  }

  getAllInstructorsAdmim(){

    return this.afs.collection("Instructor").snapshotChanges();

  }

  deleteInstructor(id){
    
      this.afs.collection("Instructor").doc(id).delete();
  }
  deleteStudent(studentId){
    this.afs.collection("Student").doc(studentId).delete();
  }
  addCourse(cname , category, price, file) {
    let imgUrl;
    const filePath = cname + String(new Date());
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.snapshotChanges().pipe( finalize( () => {
  		ref.getDownloadURL().subscribe(url =>{
        imgUrl = url;

        this.afs.collection('Course').add({
          name: cname,
          price: price,
          category: category,
          imgURL: imgUrl,
          ratings: 0,
          instructor_id: "",
          numberStudentsErrolled: 0
        }).then(() => {
          alert("Course added");
          }).catch( error =>{
            alert(error.message)
          })
        });
        
  	})).subscribe()	
    
  }

  updateCourse(id, cname, category, price){

    this.afs.collection("Course").doc(id).update({
      name: cname,
      price: price,
      category: category,
      ratings: 0,
      instructor_id: "",
      number_students: 0
    }).then(res =>{
      alert("Course updated");
    })
  }

  deleteCourse(id){
    this.afs.collection("Course").doc(id).delete().then(res =>{
      alert("Course deleted");
    })
  }

  addInstructor(name: string, surname: string, gender: string, phone: string, email: string, password: string){
    
    this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Instructor").doc(id).set({
        name: name,
        surname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
        alert("Instructro registered succesfully");
      }).catch( error => {
        alert(error)
      }).catch( error => {
        alert(error)
      })
    }).catch(error => {
      alert(error);
    })
  }

  getInstructorCourses(id: string) {
    return this.afs.collection("Course", ref => ref.where("instructor_id", "==", id)).snapshotChanges();
  }
 
  assignCourse(cid: string, instrid) {
    this.afs.collection("Course").doc(cid).update({
      instructor_id : instrid,
    }).then( res => {
      alert("Course assigned succesfully");
    })
  }

  getEnrolledCourseAdmim(courseid: any) {
    return this.afs.collection("EnrolledCourse", ref => ref.where("course_id", "==", courseid)).snapshotChanges();

  }

  getEnrolledCourseStudentAdmin(student_id: string) {
    return this.afs.collection("Student").doc(student_id).snapshotChanges();
  }
 
  test() {
    return this.afs.collection("Test").snapshotChanges();
  }

  getAnnouncements(){
    return this.afs.collection("Announcement").snapshotChanges()
  }
  
  postAdmin(subject: string ,message: string, category: string) {
    return this.afs.collection("Announcement").add({
      subject: subject,
      date: new Date(),
      message: message,
      category: category
    })
  }

  updateAnnouncement(id: any, message: any) {
    return this.afs.collection("Announcement").doc(id).update({
      message: message,
    })
  }

  getStudentsAnnouncements() {
    this.afs.collection("Announcement", ref => ref.where("category", "==", "s")).snapshotChanges()
    .subscribe(data => {
      data.forEach( studAndata =>{
        let sta = studAndata.payload.doc.data();
        
        let stuAnou = new Announcement(sta["date"],  sta["subject"], sta["message"], sta["category"], true ,studAndata.payload.doc.id);

        if(!this.searchStudentsA(stuAnou))
          this.afs.collection("ViewedAnnouncement", ref => ref.where("category", "==" , "s")).snapshotChanges()
          .subscribe( vdata => {
            if(!this.searchSaveViewedAnnouncement(vdata, stuAnou.id, this.accountService.getAccount().getStudent().getStudentNumber())){
              stuAnou.viewed = false;
              if(!this.searchStudentsA(stuAnou)){
                this.studentAnnouncement.push( stuAnou);
                this.totalNewAnnouncement++;
              }
            }else{
              if(!this.searchStudentsA(stuAnou)){
                this.studentAnnouncement.push( stuAnou);
              }
            }
            
          })
          
      });
    
    });
  }

  //Test

  searchStudentsA(ann: Announcement): boolean{
    for(let studA of this.studentAnnouncement){
      if(studA.id == ann.id){
        return true;
      }
    }

    return false;
  }
 

  saveViewedAnnouncementStudent(announcementid: string) {
    this.afs.collection("ViewedAnnouncement", ref => ref.where("student_id", "==", this.accountService.getAccount().getStudent().getStudentNumber())).snapshotChanges()
    .subscribe( data => {
      if(!this.searchSaveViewedAnnouncement(data, announcementid, this.accountService.getAccount().getStudent().getStudentNumber())){
        this.afs.collection("ViewedAnnouncement").add({
          announcement_id: announcementid,
          student_id: this.accountService.getAccount().getStudent().getStudentNumber() ,
          category: "s"
        })
      }
    })
    
  }

  searchSaveViewedAnnouncement(viewedAnnouncementsdata, announcementid: string, studentid: string) : boolean{

    for(let viewdata of viewedAnnouncementsdata){
      let viewedData = viewdata.payload.doc.data();
      if(viewedData["announcement_id"] == announcementid && viewedData["student_id"] == studentid ){
      
        return true;
      }
    }

    return false;
  }

  getQuiz(lesson_id){
    return this.afs.collection("Quiz", ref => ref.where("lesson_id", "==", lesson_id)).snapshotChanges();
  }

  getQuizMarks(student_id) {
    return this.afs.collection("QuizHistory", ref => ref.where("student_id", "==", student_id)).snapshotChanges();
  }

  saveQuizRestuls(lesson_id, student_id ,date, marks, pdf) {
    this.afs.collection("QuizHistory").add({
      lesson_id : lesson_id,
      student_id: student_id,
      date: date,
      marks: marks,
      pdf: pdf,
    });
  }
  

  getStudentsForSelectedCourse(id: string) {
    
    return this.afs.collection("EnrolledCourse", ref => ref.where("course_id", "==", id))
    .snapshotChanges();
  }  

  unassign(course_id) {
    this.afs.collection("Course").doc(course_id).update({
      instructor_id: "",
    })
  }

  getCoursesForSelectedStudent(student_id: string) {
    return this.afs.collection("EnrolledCourse", ref => ref.where("student_id", "==", student_id)).snapshotChanges();
  }

 
  updateProfile(file) {

    this.sp.isVisible = true;
    
    const filePath = this.accountService.getAccount().getStudent().getStudentNumber()
    const ref = this.storage.ref("StudentProfile/" + filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe( finalize( () => {
  		ref.getDownloadURL().subscribe(url =>{
        this.afs.collection("Student").doc(this.accountService.getAccount().getStudent().getStudentNumber()).update({
          imgURL: url,
        }).then(() => {
          this.sp.isVisible = false;
        }).catch(async error => {
          this.sp.isVisible = false;
          let toast = await this.toastController.create({
            message: error.message,
            duration: 3000,
            color: "danger",
          })
    
          toast.present()
        });

      })
  	})).subscribe()	
    
  }

  recordAttendance(id: any) {
    let date = new Date();
    
    this.afs.collection("Attendance").add({
      student_id: this.accountService.getAccount().getStudent().getStudentNumber(),
      lesson_id: id,
      date: date
    })
  }

  cancel(id) {

   let courselist = this.cs.courses.filter( course => course.id == id);

   let course = courselist[0];

   let nsEnrolled = course.numberStudentsErrolled;

   nsEnrolled--;

   this.afs.collection("Course").doc(id).update({
    numberStudentsErrolled: nsEnrolled,
   }).then(() => {
    
   })
    
   this.updateEnrolledCourse(id);
    
  }

  updateEnrolledCourse(id){
    let isDelete: boolean = false;
    if(!isDelete){
    this.afs.collection("EnrolledCourse").snapshotChanges().subscribe(data =>{
      
        for(let coursedata of data) {
      
          if(coursedata.payload.doc.data()["course_id"] == id && coursedata.payload.doc.data()["student_id"] ==
              this.accountService.getAccount().getStudent().getStudentNumber() ){
              this.afs.collection("EnrolledCourse").doc(coursedata.payload.doc.id).update({
                student_id: "",
                course_id: "",
              }).then(()=>{
                isDelete = true;
                return null;
              });
              
            }
        }
        
    })
  }
  }
 
}

