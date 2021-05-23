import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Model/student.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-coursestudents',
  templateUrl: './coursestudents.page.html',
  styleUrls: ['./coursestudents.page.scss'],
})
export class CoursestudentsPage implements OnInit {

  displayedColumns: string[] = ['studentId', 'firstname', 'lastname', 'gender', 'phone', 'email'];

  students: Student[] = [];

  dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  course_name;

  constructor(private activatedRoute :ActivatedRoute, private dbs: DatabaseService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( data => {;
      this.course_name = data["name"];
          this.dbs.getStudentsForSelectedCourse(data["course_id"]).subscribe( data =>{
           

            for(let coursedata of data){
              this.afs.collection("Student").doc(coursedata.payload.doc.data()["student_id"]).snapshotChanges()
              .subscribe( studentdata => {
                
                let student = new Student(studentdata.payload.id, studentdata.payload.data()['firstname'], studentdata.payload.data()['lastname'],
                studentdata.payload.data()['gender'], studentdata.payload.data()['phone'], studentdata.payload.data()['email']);
                
                if(!this.search(student)){
                  this.students.push(student);
                  this.dataSource = new MatTableDataSource(this.students)
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                }
              
          
              })
              
            }
          })
    
    })

    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(student: Student): boolean{
    for(let temstudent of this.students){
      if(temstudent.getStudentNumber() == student.getStudentNumber()){
        return true;
      }
    }

    return false;
  }

}


