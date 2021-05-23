import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/Model/lesson.mode';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-leasons',
  templateUrl: './leasons.page.html',
  styleUrls: ['./leasons.page.scss'],
})
export class LeasonsPage implements OnInit {
selectTabs ="recent";
videoURL;
 lessonList: Lesson[];
 tempLessonList: Lesson[] = [];
 course_name;
 nquizwritten: number;  
 isLessonAvailable: boolean = false;

  constructor(public activageRoute: ActivatedRoute,public dbs: DatabaseService, private router: Router) { }

  ngOnInit() {
    
    this.activageRoute.queryParams.subscribe(data =>{
      this.course_name = data["name"];
      
      this.lessonList = [];

       this.lessonList = this.dbs.lessonsList.filter( lesson => lesson.course_id == data["course_id"]);

       if(this.lessonList.length > 0){
         this.isLessonAvailable = true;
       } 
       
       this.deleteDuplicates();

       this.nquizwritten = this.lessonList.filter( lesson => lesson.isWritten == true).length;

       this.sort();

       console.log(this.lessonList);

       if(localStorage.getItem("url").toString().length > 1){
        this.videoURL = localStorage.getItem("url");
       }
       

      
    })
  }

  play(videoURL, id){
    this.videoURL = videoURL;

    localStorage.setItem("url", videoURL); 
    
    this.dbs.recordAttendance(id);
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

  navigateToQuiz(lesson_id){
    
    this.router.navigate(["quiz"], {queryParams: {"lesson_id": lesson_id}})
  }

}