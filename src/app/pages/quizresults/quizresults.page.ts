import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { QuestionResults } from 'src/app/Model/questionresults.model';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import { QuizserviceService } from 'src/app/services/quizservice.service';

@Component({
  selector: 'app-quizresults',
  templateUrl: './quizresults.page.html',
  styleUrls: ['./quizresults.page.scss'],
})
export class QuizresultsPage implements OnInit {

  questionResults: QuestionResults[] = [];
  date = new Date();
  totalMarks: number = 0;

  constructor(public qs: QuizserviceService, private dbs: DatabaseService, private accountService: AccountService) { }

  ngOnInit() {
    this.questionResults = this.qs.questionResults;

     for(let questionResult of this.questionResults){
      if(questionResult.answer == questionResult.student_answer){
        console.log(questionResult.marks)
        this.totalMarks = this.totalMarks + questionResult.marks;
      }
    }


    this.dbs.saveQuizRestuls(this.qs.quiz.lesson_id, this.accountService.getAccount().getStudent().getStudentNumber() , this.date, this.totalMarks / this.qs.quiz.total_marks * 100, this.generage());

  }

  generage(): string{

    let quizR: string = "Student id: " + this.accountService.getAccount().getStudent().getStudentNumber() + "\n";
    quizR = quizR + "Email: " + this.accountService.getAccount().getStudent().getEmail() + "\n";
    quizR = quizR + "Full Name: " + this.accountService.getAccount().getStudent().geteName() 
    + " " + this.accountService.getAccount().getStudent().geteName() + "\n";

    quizR = quizR + "Topic: " + this.qs.quiz.topic + "\n";
    
    quizR = quizR + "Date : " +  String(new Date().getDate()) + "\\" + String(new Date().getMonth()) + 
    "\\" + String(new Date().getFullYear()) + "\n";

    quizR = quizR + "Total Marks: " + String(this.qs.quiz.total_marks) + "\n";

    quizR = quizR + "Marks : " + String(this.totalMarks) + "\n\n\n";

    let doc = new jsPDF();
    for(let questionResult of this.questionResults){

      quizR = quizR + "(" + String(questionResult.qno) + ")  " + questionResult.question + " (" + String(questionResult.marks) + "  Marks)" +
       "\n\tCorrect Answer : " + questionResult.answer + "\n\tYour Answer : " + questionResult.student_answer + "\n\t";
      if(questionResult.answer == questionResult.student_answer){
        quizR = quizR + String(questionResult.marks) + " (Marks)" + "\n";
      }else{
        quizR = quizR + String(0) + " (Marks)" + "\n";
      }
      quizR = quizR + "\n";
    }

    doc.text(quizR, 10, 20);
    
    doc.save(this.qs.quiz.topic);
  
  
    return quizR;
  }

}
