import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-createannouncement',
  templateUrl: './createannouncement.page.html',
  styleUrls: ['./createannouncement.page.scss'],
})
export class CreateannouncementPage implements OnInit {

  constructor(private dbs: DatabaseService, public modalController: ModalController) { }

  ngOnInit() {
  }

  post(subject: string ,message: string, category: string){
    
  }

}
