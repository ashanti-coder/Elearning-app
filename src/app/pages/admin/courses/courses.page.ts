import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Course } from 'src/app/Model/course';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { AddcoursePage } from '../addcourse/addcourse.page';
import { EditcoursePage } from '../editcourse/editcourse.page';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { isFormattedError } from '@angular/compiler';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})


export class CoursesPage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'numberStudentsErrolled', 'actions'];

  courses: Course[] = [];

  dataSource: MatTableDataSource<Course>;

  tempVar: Course[] = [];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

    this.dbs.getCourses().subscribe(data =>{
      
        data.forEach(coursedata => {
          let tempvar = coursedata.payload.doc.data();
          
        
          let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
          tempvar["imgURL"], tempvar["category"], tempvar["price"], tempvar["instructor_id"]);
          
          course.numberStudentsErrolled = tempvar['numberStudentsErrolled'];
          if(!this.search(course)){
            this.courses.push(course);
          }
          
      });

      this.dataSource = new MatTableDataSource(this.courses);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
      

    });

    
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }


  search(course: Course): boolean{
    for(let temcourse of this.courses){
      if(temcourse.id == course.id){
        return true;
      }
    }

    return false;
  }

  async addCourse(){
    const modal = await this.modalController.create({
      component: AddcoursePage,
    });
    await modal.present();
  }

  async editCourse(id){
    for(let i = 0; i < this.courses.length; i++){
      if(this.courses[i].id == id){
        const modal = await this.modalController.create({
          component: EditcoursePage,
          componentProps: {
            course: this.courses[i],
          },
        })
        await modal.present();
        break;
      }
    }
    
  }

  deleteCourse(id){
    if(confirm("Are you sure, you want to delete?"))
      this.dbs.deleteCourse(id);
  }

  navigateToCourseStudents(course_id, name){
    this.router.navigate(['./admin/adminpanel/coursestudents'], {queryParams: {"course_id": course_id, "name": name}});

  }

  filter(value){
    this.dataSource.filter = value;
  }
  

}
