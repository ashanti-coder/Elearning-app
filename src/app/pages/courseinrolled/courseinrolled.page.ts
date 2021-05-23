import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Course } from 'src/app/Model/course';
import { EnrolledCourse } from 'src/app/Model/enrolledcourse.model';
import { DatabaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';

@Component({
  selector: 'app-courseinrolled',
  templateUrl: './courseinrolled.page.html',
  styleUrls: ['./courseinrolled.page.scss'],
})
export class CourseinrolledPage implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];


  enrolledCourses: Course[] = [];


  tempVar: Course[] = [];

  dataSource: MatTableDataSource<Course>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private Router: Router , private dbs: DatabaseService) { }

  lessons(course_id: string, name: string) {
    this.Router.navigate(["leasons"], {queryParams: {"course_id": course_id, "name": name}}); 
  }
  ngOnInit() {
    this.enrolledCourses = this.dbs.coursesList; 
   this.getCoursesList();
  }

  getCoursesList(){
   
    for(let course of this.enrolledCourses){
      if( this.tempVar.length < 1){
        this.tempVar.push(course);
      }else{
        if(!this.search(course)){
          this.tempVar.push(course);
        }
        
      }
    }

    this.enrolledCourses = this.tempVar;
    console.log(this.enrolledCourses);
    this.dataSource = new MatTableDataSource(this.enrolledCourses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    return this.enrolledCourses;
  }

  search(course: Course): boolean{
    for(let temcourse of this.tempVar){
      if(temcourse.id == course.id){
        return true;
      }
    }

    return false;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cancel(id){
    
    this.dbs.cancel(id);

    // for(let i = 0; i < this.enrolledCourses.length; i++){
    //   if(this.enrolledCourses[i].id = id){
    //     this.enrolledCourses.splice(i, 1);
    //   }
    // }
  }
}
