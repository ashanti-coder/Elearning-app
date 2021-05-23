import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from 'src/app/services/Student-Service/student.service';
import { StudentClass } from 'src/app/Model/Student-Model/student';
import { StudentInfo } from 'src/app/Model/Student-Model/student_Info';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { EnrolledCourse } from 'src/app/Model/EnrolledCourse';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { DatabaseService } from 'src/app/services/database.service';
import { AccountService } from 'src/app/services/account.service';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../../popover/popover.page';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  available_course: Course [] = [];
  enrolled_courses: EnrolledCourse[] =[];
  courseDetails: Course[]=[];
  loggedIn: boolean = false;
  isEdit : boolean = false;
  imgURL;

num:number = 0;
  showEnrolledCourses:boolean;
  showAvailableCourses:boolean;
  studentAccount: StudentClass;
  user = {} as StudentInfo;

  updateUserForm: FormGroup;
 
   constructor(public fb: FormBuilder,
    private sts: StudentService,
    public loadingCtrl: LoadingController,
    private asf: AngularFirestore, private dbs: DatabaseService, private accountService: AccountService
    ,public popoverController: PopoverController) {
      this.studentAccount = new StudentClass();
      this.updateUserForm = new FormGroup({
        'firstname': new FormControl('', Validators.compose([
          Validators.required,
        ])),
        'lastname': new FormControl('', Validators.compose([
          Validators.required,
        ])),
        'phone': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]))
      }); 
      this.showEnrolledCourses = false;
      this.showAvailableCourses = false;
    }
    ngOnInit() {
      this.getCourses();
      this.getEnrolledCourses();
      this.updateUserForm.reset();
      this.setUserAccount(); 

      this.imgURL = this.accountService.getAccount().getStudent().imgURL;
    }


  setUserAccount(){
    let userID = firebase.auth().currentUser.uid.toString();
    this.asf.collection("Student").doc(userID).valueChanges().subscribe(data =>{   
      // set student data      
      this.user.studentId = userID;
      this.user.firstname = data["firstname"];
      this.user.lastname =  data["lastname"];
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
  updateForm() {
    if (window.confirm('You are updating!')){
    this.presentLoading();
    this.sts.update_student(this.studentAccount.getStudentNumber(), this.updateUserForm.value)
    .then(() => {
      this.loadingCtrl.dismiss();
      this.isEdit = false;
    })
    .catch(error => {
      alert(error);
    });
  }
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 10 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getEnrolledCourses(){  
    let userID = firebase.auth().currentUser.uid.toString();
    this.sts.getEnrolledCourses(userID).subscribe(data => {
      this.enrolled_courses = data.map(e => {
        return{
          id: e.payload.doc.id,
          ... e.payload.doc.data() as EnrolledCourse
        } as EnrolledCourse
      })
    });
  }
  getCourses(){
    this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(storeItems =>{
      this.available_course = storeItems;
    })
  }
  async presentLoading() { 
    const loader = this.loadingCtrl.create({
      message: "Updating user information....",
    });
    (await loader).present();
  }


  async uploadPhoto(ev){
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


}
