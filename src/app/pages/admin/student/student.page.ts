import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Student } from 'src/app/Model/student.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  displayedColumns: string[] = ['studentId', 'firstname', 'lastname', 'gender', 'phone', 'email', 'actions'];

  students: Student[] = [];

  dataSource: MatTableDataSource<Student>;

  tempVar: Student[] = [];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

   this.getAllStudents();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteDuplicates(){
    for(let student of this.students){
      if( this.tempVar.length < 1){
        this.tempVar.push(student);
      }else{
        if(!this.search(student)){
          this.tempVar.push(student);
        }
        
      }
    }

    this.students = this.tempVar;
    console.log(this.students)
    return this.students;
  }

  search(student: Student): boolean{
    for(let temstudent of this.tempVar){
      if(temstudent.getStudentNumber() == student.getStudentNumber()){
        return true;
      }
    }

    return false;
  }

  deleteStudent(studentId){
    if(confirm("Are you sure?")){
      this.dbs.deleteStudent(studentId);
    
      this.deleteStudentFromArray(studentId);

      this.getAllStudents();
    }
    
    
  }

  getAllStudents(){
    this.dbs.getAllStudentsAdmim().subscribe(data =>{
      data.forEach(studentdata => {
        let tempvar = studentdata.payload.doc.data();

        let student = new Student(studentdata.payload.doc.id, tempvar['firstname'], tempvar['lastname'],
        tempvar['gender'], tempvar['phone'], tempvar['email']);
        

        this.students.push(student);
        
        this.deleteDuplicates();
        
    });



    this.dataSource = new MatTableDataSource(this.students);
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
    

  });

  }

  deleteStudentFromArray(studentId){
    for(let i = 0; i < this.students.length ; i++){
      if(this.students[i].getStudentNumber() == studentId){
        this.students.splice(i,1);
      }
    }
  }

  studentCourses(id, firstname, lastname){
  
      this.router.navigate(['./admin/adminpanel/studentenrolledcourse'] , {queryParams: { "id": id, "firstname": firstname, "lastname": lastname}})
  }

  filter(value){
    this.dataSource.filter = value;
  }
}
