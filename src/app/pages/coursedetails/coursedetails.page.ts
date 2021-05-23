import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Account } from 'src/app/Model/account.model';
import { Course } from 'src/app/Model/course';
import { AccountService } from 'src/app/services/account.service';
import { CourseService } from 'src/app/services/course.service';
import { EnrolledCourse } from 'src/app/Model/EnrolledCourse';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.page.html',
  styleUrls: ['./coursedetails.page.scss'],
})
export class CoursedetailsPage implements OnInit {
  
  courseSelected: Course;
  userAccount:Account;
  
  enrolled_course: EnrolledCourse;

  constructor(private modalCtrl: ModalController,
    private courseDao:CourseService,
    private route:Router,
    private afs:AngularFirestore,
    private toastController: ToastController,
    private accountService:AccountService) { 
    }
  ngOnInit() {
    this.courseSelected = this.courseDao.selectedC; 
    this.userAccount = this.accountService.getAccount();
   
  }
  
  close() {
    this.modalCtrl.dismiss();
  }
  enroll(){
      //Check if the user has signed in
      if (this.userAccount.getSignInStatus() == true) {
        let id = this.afs.createId();

        

        // Firstly the code goes to enrolled coours collection so 
        // that it can check if the student has already enrolled for that course
        this.afs.collection("EnrolledCourse").snapshotChanges().subscribe(data =>{
          
          //It calls the search student to search the student
          //If the student is not found then student can enroll
          if(!this.searchStudent(data)){
            this.afs.collection("EnrolledCourse").add({
              course_id: this.courseSelected.id,   //From Entity --course_id
              student_id: this.userAccount.getStudent().getStudentNumber()      //From Entity --student_id
      
            }).then( () => {
              
              this.afs.collection("Course").doc(this.courseSelected.id).update({
                numberStudentsErrolled: this.courseSelected.numberStudentsErrolled + 1,
              }).then(async ()=> {
               
                let toast = await this.toastController.create({
                  message: "Successully enrolled",
                  duration: 3000,
                  color: "success",
                })
          
                toast.present()
                this.close();
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
        })
       
       } else {
        this.close();
        this.route.navigateByUrl('account');
      }
  }


  searchStudent(enrcourses): boolean{
    for(let enrcourse of enrcourses){
      if(enrcourse.payload.doc.data()["student_id"] == this.userAccount.getStudent().getStudentNumber()
       && enrcourse.payload.doc.data()["course_id"] == this.courseSelected.id) return true;
    }

    return false;
  }
}
