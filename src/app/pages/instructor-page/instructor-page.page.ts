import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.page.html',
  styleUrls: ['./instructor-page.page.scss'],
})
export class InstructorPagePage implements OnInit {

  loggedIn: boolean = false;

  constructor( private auth: AngularFireAuth) { }
  ngOnInit() {
    
    this.auth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
       } else {
        this.loggedIn = false;
      }
    })
    window.alert("Logged in: "+this.loggedIn);
  }
}
