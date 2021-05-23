import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.page.html',
  styleUrls: ['./editcourse.page.scss'],
})
export class EditcoursePage implements OnInit {
  file;
  @Input() course: Course;
  @Input() name: string;

  constructor( private router: Router, private dbs: DatabaseService, public modalController: ModalController) { }

  ngOnInit() {
    
  }

  uploadFile(event) {

    this.file = event.target.files[0];

  }

  updateCourse(cname, catogory, price){
    this.dbs.updateCourse(this.course.id, cname, catogory, price);
  }

  close(){
    this.modalController.dismiss();
  }


}
