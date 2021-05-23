import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';

import { CoursedetailsPage} from './../coursedetails/coursedetails.page'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  

  categories : Course [] = [];
  popular_instructors: Course []=[];

  selectedCourse;
  iT: string = 'IT';
  bM: string = 'Business Management';
  py: string = 'Photography';
  fi: string = 'Finances';


  constructor(private router: Router, 
    private asf:AngularFirestore,
    private modalCtrl: ModalController,
    private courseDao: CourseService) {}
  navigateToCourselink(){
    this.router.navigateByUrl("coursedetails");

  }
  ngOnInit(){
    this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(objects =>{
      this.categories = objects;
   })
   this.asf.collection<Course>("Instructor").valueChanges({idField: 'id'}).subscribe(objects =>{
    this.popular_instructors= objects;
 })
  }
   //Selected course
   selectCourse(_course){  
    this.selectedCourse = _course;
    this.courseDao.selectCourse(this.selectedCourse); //Set the selected course globally to the course service
     this.courseDetails(); //Open Modal course details
  }
  async courseDetails() {
    let modal = await this.modalCtrl.create({
    component: CoursedetailsPage,
   
  });
  modal.present();
} 
 

}