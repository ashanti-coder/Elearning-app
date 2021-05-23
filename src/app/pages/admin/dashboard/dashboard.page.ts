import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from "chart.js";

import { Course } from 'src/app/Model/course';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  courses: Course[] = [];
  students: number;
  instructors: number;
  nCourses: number;
  constructor(private dbs: DatabaseService, private router: Router) { }

  ngOnInit() {

    this.dbs.getCourses().subscribe(data =>{
      this.nCourses = data.length;
        data.forEach(coursedata => {
          let tempvar = coursedata.payload.doc.data();
          
        
          let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
          tempvar["imgURL"], tempvar["category"], tempvar["price"], tempvar["instructor_id"]);
          
          course.numberStudentsErrolled = tempvar['numberStudentsErrolled'];
          if(!this.search(course))
            this.courses.push(course);
          
          
      });

          let coursesnames = this.courses.map(course => course.name);
          
          let numStudents = this.courses.map(course => course.numberStudentsErrolled);

          let bgcs: string[] = [];

          for(let i = 0; i <  this.courses.length; i++){
            let bgc: string;

            let r = Math.round(Math.random() * 255);
            let g = Math.round(Math.random() * 255);
            let b = Math.round(Math.random() * 255);

            bgc = `rgba(${r}, ${g}, ${b}, .5)`;

            bgcs.push(bgc)
          
          }


        let myChart = new Chart("barchart", {
          type: 'bar',
          data: {
              labels: coursesnames,
              datasets: [{
                  data: numStudents,
                  backgroundColor: bgcs,
                  borderWidth: 1
              }]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              position: "top",
              text: "No Students Per Course",
              fontSize: 18,
              fontColor: "#111"
            },
            legend: {
              display: false,
              position: "bottom",
              labels: {
                fontColor: "#333",
                fontSize: 16
              }
            },
            scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: false
                      }
                  }]
              },
              
          }
      });

    });


      this.getStudents();
      this.getInstructors();
  
  }

  navigateToStudents(){
    this.router.navigateByUrl("admin/adminpanel/student")

  }

  navigateToCourses(){
    this.router.navigateByUrl("admin/adminpanel/courses")

  }

  navigateToInstructors(){
    this.router.navigateByUrl("admin/adminpanel/instructors")

  }

  getStudents(){
    this.dbs.getAllStudentsAdmim().subscribe(data => {
      this.students = data.length;
    })
  }

  getInstructors(){
    this.dbs.getAllInstructorsAdmim().subscribe(data => {
      this.instructors = data.length;
    })
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
