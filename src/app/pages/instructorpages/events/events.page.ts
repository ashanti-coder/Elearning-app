import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Announcement } from 'src/app/Model/announcement.model';
import { QuestionResults } from 'src/app/Model/questionresults.model';
import { Test } from 'src/app/Model/test.model';
import { DatabaseService } from 'src/app/services/database.service';
import { CreateannouncementPage } from '../createannouncement/createannouncement.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  

  studentsAnnouncements: Announcement[] = [];

  instructorsAnnouncements: Announcement[] = [];

  constructor(private dbs: DatabaseService, public modalController: ModalController) { }

  ngOnInit() {

    this.dbs.getAnnouncements().subscribe( data =>{
      data.forEach(anndata =>{
        let announcementdata = anndata.payload.doc.data();
        
        let annouObject = new Announcement(announcementdata["date"], announcementdata["subject"], announcementdata["message"], announcementdata["category"],true, anndata.payload.doc.id,);

        console.log(annouObject.subject)
        if(annouObject.category == "s"){
          if(!this.searchStudentsA(annouObject))
            this.studentsAnnouncements.push(annouObject);
        }else{
          if(!this.searchInA(annouObject))
            this.instructorsAnnouncements.push(annouObject);
        }
      })
    })
      
  }

 

  enable(ref){
    ref.disabled = false;
  }

  save(ref, id){
    
    this.dbs.updateAnnouncement(id, ref.value).then(() =>{
      ref.disabled = true;
      alert("Post updated")
    })
  }

  async createAnnouncement(){
    const modal = await this.modalController.create({
      component: CreateannouncementPage,
      
    });
    await modal.present();
  }

  searchStudentsA(ann: Announcement): boolean{
    for(let studA of this.studentsAnnouncements){
      if(studA.id == ann.id){
        return true;
      }
    }

    return false;
  }

  searchInA(ann: Announcement): boolean{
    for(let studA of this.instructorsAnnouncements){
      if(studA.id == ann.id){
        return true;
      }
    }

    return false;
  }

 

}
