import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SpinnerService } from 'src/app/services/spinner.service';
import  firebase from 'firebase/app';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  isVisible = false;
  constructor(private dbs: AuthenticationService, public popoverController: PopoverController, public sp: SpinnerService) { }

  ngOnInit() {
    
  }

  updateProfilePic(event) {
    let userID = firebase.auth().currentUser.uid.toString();
    this.dbs.updateProfile(userID,event.target.files[0])
    this.popoverController.dismiss()
    
  }

}
