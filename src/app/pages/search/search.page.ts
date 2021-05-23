import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';
import { DatabaseService } from 'src/app/services/database.service';
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  courses: Course[] = [];

  tempvar: Course[] = [];

  selectedCourse: Course;


  constructor(public dbs: DatabaseService,private courseDao: CourseService, private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.dbs.getCourses().subscribe(data =>{
      
      data.forEach(coursedata => {
        let tempvar = coursedata.payload.doc.data();
        
        let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
        tempvar["imgURL"], tempvar["category"], tempvar["price"], tempvar["instructor_id"]);     
        course.numberStudentsErrolled = tempvar['numberStudentsErrolled'];

        if(!this.search(course)){
          this.courses.push(course);
          this.tempvar.push(course);
        }
        
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

  searchCourse(value: string){

    if(value.length < 1){
      this.tempvar = this.courses;
    }else{
      this.tempvar = this.courses.filter( course => course.name.toLowerCase().startsWith(value.toLowerCase()))
    }
   

    

  }


  selectCourse(_course:Course){  
    this.selectedCourse = _course;
    this.courseDao.selectCourse(this.selectedCourse); //Set the selected course globally to the course service
     this.courseDetails(); //Open Modal course details
  }
  async courseDetails() {
    let modal = await this.modalCtrl.create({
    component: CoursedetailsPage
  });
  modal.present();
}     

}
