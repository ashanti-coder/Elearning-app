import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Student } from '../../Model/student.model';
import { Account } from 'src/app/Model/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MatSidenav } from '@angular/material/sidenav';
import { PopoverController } from '@ionic/angular';
import { PopovermainPage } from '../popovermain/popovermain.page';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  loginStatus: boolean = false;

  isStudent: boolean = true;
  userAccount: Account;
  constructor(public accountService: AccountService,
    public loadingCtrl: LoadingController,
    private auth: AngularFireAuth,
    private afs:AngularFirestore, private dbs: DatabaseService,
     private router: Router, public popoverController: PopoverController, 
     public sp: SpinnerService, public cs: CourseService) {}
  
    ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.afs.collection("Student").doc(user.uid).valueChanges().subscribe(data =>{
          // set student data
          let student = new Student(user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"], data["imgURL"]);
          //create account object that has sign state and student object
          this.userAccount = new Account(true, student);
          //set Account service to keep account object
          this.accountService.setAccount(this.userAccount);

          this.dbs.getEnrolledCourses();

          this.dbs.getStudentsAnnouncements()
        })
        this.loginStatus = true;
          } else {
        this.loginStatus = false;
      }
    })

    this.dbs.getCourses().subscribe(data =>{
      
      data.forEach(coursedata => {
        let tempvar = coursedata.payload.doc.data();
      
            let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
            tempvar["imgURL"], tempvar["category"], tempvar["price"], tempvar["instructor_id"]);
            
            course.numberStudentsErrolled = tempvar['numberStudentsErrolled'];
            
            if(!this.search(course)){
              this.cs.courses.push(course)
            }
            
        });

      });
  }

  search(course: Course): boolean{
    for(let temcourse of this.cs.courses){
      if(temcourse.id == course.id){
        return true;
      }
    }

    return false;
  }
 

  navigateToAnnouncement(){
    this.dbs.totalNewAnnouncement = 0;
    this.router.navigateByUrl("studentannouncement")
  }

  async openPopover(ev){
    const popover = await this.popoverController.create({
      component: PopovermainPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  navigateToSearch(){
    this.router.navigateByUrl("search");
  }
  
  

}
