import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.page.html',
  styleUrls: ['./addcourse.page.scss'],
})
export class AddcoursePage implements OnInit {
  file;
  constructor(private storage: AngularFireStorage, private router: Router, private dbs: DatabaseService, private modalController: ModalController) { }

  ngOnInit() {
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
  addCourse(cname, catogory, price){
    this.dbs.addCourse( cname, catogory, price, this.file);
  }

  close(){
    this.modalController.dismiss();
  }

}
