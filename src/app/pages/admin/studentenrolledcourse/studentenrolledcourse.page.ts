import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Model/course';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-studentenrolledcourse',
  templateUrl: './studentenrolledcourse.page.html',
  styleUrls: ['./studentenrolledcourse.page.scss'],
})
export class StudentenrolledcoursePage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category'];

  courses: Course[] = [];

  dataSource: MatTableDataSource<Course>;

  tempVar: Course[] = [];

  student_id: string;

  name: string;

  surname: string;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  constructor(private activatedRoute: ActivatedRoute, private dbs: DatabaseService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.student_id = data["id"];
     
      this.name = data["firstname"];

      this.surname = data["lastname"];

      this.dbs.getCoursesForSelectedStudent(this.student_id).subscribe(data => {
        for(let er of data){
          this.afs.collection("Course").doc(er.payload.doc.data()["course_id"])
          .snapshotChanges().subscribe(coursedata => {
            let course = new Course(coursedata.payload.id, coursedata.payload.data()["name"], coursedata.payload.data()["ratings"],
            coursedata.payload.data()["imgURL"], coursedata.payload.data()["category"], coursedata.payload.data()["price"], coursedata.payload.data()["instructor_id"]);
            
            if(!this.search(course)){
              this.courses.push(course);
              this.dataSource = new MatTableDataSource(this.courses);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              }
            
          })
        }
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(course: Course): boolean{
    for(let temcourse of this.courses){
      if(temcourse.id == course.id){
        return true;
      }
    }

    return false;
  }

}
