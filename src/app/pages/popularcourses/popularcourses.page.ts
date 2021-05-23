import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FeaturedCourse } from 'src/app/MockData/featured.mock';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';
import { DatabaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';

@Component({
  selector: 'app-popularcourses',
  templateUrl: './popularcourses.page.html',
  styleUrls: ['./popularcourses.page.scss'],
})
export class PopularcoursesPage implements OnInit {
  selectedCourse; //On select course item

  popular_course: Course [] = []; //All courses offered
  popular_instructors: Course []=[];
  imgDidLoad: boolean;
  
  constructor( 
    private modalCtrl: ModalController, 
    private asf:AngularFirestore,
    private coursesService: CourseService, 
    private dbService: DatabaseService, private sp: SpinnerService){}
     
    ngOnInit() {
      this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(objects =>{
        this.popular_course = objects.slice(0,8);
     })
     this.asf.collection<Course>("Instructor").valueChanges({idField: 'id'}).subscribe(objects =>{
      this.popular_instructors= objects;
   })
    } 
    //Selected course
    selectCourse(_course){  
      this.selectedCourse = _course;
      this.coursesService.selectCourse(this.selectedCourse); //Set the selected course globally to the course service
       this.courseDetails(); //Open Modal course details
    }
    async courseDetails() {
      let modal = await this.modalCtrl.create({
      component: CoursedetailsPage,
      
    });
    modal.present();
  }

  ionImgWillLoad(){
    
    this.sp.isVisible = true;
  }

  ionImgDidLoad(){
    this.imgDidLoad = true;
    this.sp.isVisible = false;
  }

}
