import { Injectable } from '@angular/core';
import { QuestionResults } from '../Model/questionresults.model';
import { Quiz } from '../Model/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizserviceService {

  questionResults: QuestionResults[] = [];
  quiz: Quiz;
  
  constructor() { }
}
