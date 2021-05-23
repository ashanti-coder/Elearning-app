import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { EnrolledCourse } from 'src/app/Model/EnrolledCourse';
import { Student } from 'src/app/Model/student.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

//For students
displayedColumnsStudents: string[] = ['studentId', 'firstname', 'lastname', 'gender', 'phone', 'email'];
students: Student[] = [];
studentDataSource: MatTableDataSource<Student>;
tempVar2: Student[] = [];
@ViewChild(MatPaginator) studentsPaginator: MatPaginator;
@ViewChild(MatSort) studentsSort: MatSort;
//For courses
displayedColumnsCourses: string[] = ['id', 'name', 'category', 'numberStudentsErrolled'];
courses: Course[] = [];
coursesDataSource: MatTableDataSource<Course>;
tempVar: Course[] = [];
@ViewChild(MatPaginator) coursesPaginator: MatPaginator;
@ViewChild(MatSort) coursesSort: MatSort;
instructorid: string;

constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController, private acivatedRoute: ActivatedRoute) {
 }
ngOnInit() {
  this.acivatedRoute.queryParams.subscribe(data => {
    let instructorId = data["id"];
    this.instructorid = instructorId;
    this.getCourses(instructorId);
  })
  
  //this.getAllStudents()
}
ngAfterViewInit() {
  //this.dataSource.paginator = this.paginator;
  //this.dataSource.sort = this.sort;
}
getCourses(id){
  this.dbs.getInstructorCourses(id).subscribe(data =>{
    data.forEach(coursedata => {
      let tempvar = coursedata.payload.doc.data();

      let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
      tempvar["imgURL"], tempvar["category"], tempvar["instructor_id"], tempvar['numberStudentsErrolled']);
      if(!this.search(course)){
        this.courses.push(course);
        this.getAllStudents(course.id);
      } 
  });
  this.coursesDataSource = new MatTableDataSource(this.courses);
 this.coursesDataSource.sort = this.coursesSort;
 this.coursesDataSource.paginator = this.coursesPaginator;
});
  this.coursesDataSource = new MatTableDataSource(this.courses);
 this.coursesDataSource.sort = this.coursesSort;
 this.coursesDataSource.paginator = this.coursesPaginator;
}
getAllStudents(courseid){
this.dbs.getEnrolledCourseAdmim(courseid).subscribe(data =>{
  data.forEach( encoursedata => {
    let tempvar = encoursedata.payload.doc.data();

    let enrcourse = new EnrolledCourse(encoursedata.payload.doc.id, tempvar['student_id'], tempvar['course_id']);
    
    this.dbs.getEnrolledCourseStudentAdmin(enrcourse.student_id).subscribe( studentdata => {
      let tempvar = studentdata.payload.data();

      let student = new Student(studentdata.payload.id, tempvar['firstname'], tempvar['lastname'],
      tempvar['gender'], tempvar['phone'], tempvar['email']);
      if(!this.searchStudent(student))
        this.students.push(student);
        this.studentDataSource = new MatTableDataSource(this.students);
        this.studentDataSource.sort = this.studentsSort;
        this.studentDataSource.paginator = this.studentsPaginator;
    })
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
searchStudent(student: Student): boolean{
  for(let tempstud of this.students){
    if(tempstud.getStudentNumber() == student.getStudentNumber()){
      return true;
    }
  }

  return false;
}
async addCourse(){
  const modal = await this.modalController.create({
    component: null,
  });
  await modal.present();
}
assignCourse(id){
  this.dbs.assignCourse(id, this.instructorid)
}
}