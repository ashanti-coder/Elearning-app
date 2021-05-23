import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  isVisible = false;
  constructor(private dbs: DatabaseService, public popoverController: PopoverController, public sp: SpinnerService) { }

  ngOnInit() {
    
  }

  updateProfilePic(event) {
    
    this.dbs.updateProfile(event.target.files[0])
    this.popoverController.dismiss()
    
  }

}
