import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/Model/lesson.mode';
import { QuizHistory } from 'src/app/Model/quizhistory.model';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-quizmarks',
  templateUrl: './quizmarks.page.html',
  styleUrls: ['./quizmarks.page.scss'],
})
export class QuizmarksPage implements OnInit {

  displayedColumns: string[] = [ 'date', 'marks', 'pdf'];

  lessonList: Lesson[];

  tempLessonList: Lesson[] = [];

  course_name;

  quizHitory: QuizHistory[] = [];
  
  dataSource;


  constructor(public activageRoute: ActivatedRoute,public dbs: DatabaseService, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    
    this.activageRoute.queryParams.subscribe(data =>{
      this.course_name = data["name"];
      
      this.lessonList = [];
       this.lessonList = this.dbs.lessonsList.filter( lesson => lesson.course_id == data["course_id"]);

       this.deleteDuplicates();

       this.sort();

      
    })
  }

  sort(){
    let tempvar: Lesson;
    for(let i = 0; i < this.lessonList.length; i++){
      
      for(let k = 0 ; k < this.lessonList.length; k++){
        if(this.lessonList[i].number < this.lessonList[k].number){
          tempvar = this.lessonList[k];
          this.lessonList[k] = this.lessonList[i];
          this.lessonList[i] = tempvar;
        }
      }
    }
  }

  erasedatasource(){
    this.dataSource = null;
    this.quizHitory = [];
  }
  deleteDuplicates(){
    this.tempLessonList.push(this.lessonList[0]);
    for(let lesson of this.lessonList){
      if(this.search(lesson) == false){
        this.tempLessonList.push(lesson);
      }
    }
    this.lessonList = this.tempLessonList;

  }

  search(lesson: Lesson): boolean{
    for(let temcourse of this.tempLessonList){
      if(temcourse.number == lesson.number){
        return true;
      }
    }

    return false;
  }

  getMarks(lesson_id){
  
    this.dbs.getQuizMarks(this.accountService.getAccount().getStudent().getStudentNumber()).subscribe(data => {
      
      for(let quizhistory of data){
        if(quizhistory.payload.doc.data()["lesson_id"] == lesson_id){
          let quiz = new QuizHistory(quizhistory.payload.doc.id, quizhistory.payload.doc.data()["date"], 
          quizhistory.payload.doc.data()["marks"],quizhistory.payload.doc.data()["pdf"])
          
           this.quizHitory [0] = quiz;
           this.dataSource = this.quizHitory;

           break;
        }

      }
    
     
    })
  }

  generate(pdf, name){
    let doc = new jsPDF();

    doc.text(pdf, 10, 20);
    
    doc.save(name);
  }


}
