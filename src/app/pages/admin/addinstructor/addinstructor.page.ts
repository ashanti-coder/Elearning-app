import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-addinstructor',
  templateUrl: './addinstructor.page.html',
  styleUrls: ['./addinstructor.page.scss'],
})
export class AddinstructorPage implements OnInit {

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) { }

  ngOnInit() {
  }

  addInstructor(name, surname, gender, phone, email, password){
    this.dbs.addInstructor(name, surname, gender, phone, email, password);
  }

  close(){
    this.modalController.dismiss();
  }

}
