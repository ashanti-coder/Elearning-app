import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/Model/announcement.model';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-studentannouncement',
  templateUrl: './studentannouncement.page.html',
  styleUrls: ['./studentannouncement.page.scss'],
})
export class StudentannouncementPage implements OnInit {

  studentAnnouncement: Announcement[] = [];
  canHide: boolean = false;

  constructor(private dbs: DatabaseService, private accountService: AccountService) { }

  ngOnInit() {

    this.studentAnnouncement = this.dbs.studentAnnouncement;
    
    
  }

 
  view(annoucementObject){
    annoucementObject.viewed = true;
    this.dbs.saveViewedAnnouncementStudent(annoucementObject.id)
    
  }


}
