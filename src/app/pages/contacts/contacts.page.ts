import { Component, OnInit,OnDestroy } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';
// import * as Leaflet from 'leaflet';
// import { antPath } from 'leaflet-ant-path';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  //map: Leaflet.Map;

  constructor( private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() { }

  async send() {
    // Perfom PayPal or Stripe checkout process
 
    let alert = await this.alertCtrl.create({
      header: 'Thank you!',
      message: 'We will be in touch',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
  }
  
