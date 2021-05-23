import { Component, NgZone, OnInit } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  
  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  isVisible: boolean = false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    public loadingCtrl: LoadingController, private toastController: ToastController,

    public angularFire: AngularFireAuth,
    
    public router: Router,
    private ngZone: NgZone,
    private authService: AuthenticationService
  ) {
    this.signInForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.angularFire.authState.subscribe(user => {
      if (user) {
        console.log("Logged in");
        
             } else {
        console.log("Logged out");
        
      }
    })
  }
  ngOnInit(){
    this.angularFire.authState.subscribe(user => {
      if (user) {
        console.log("Logged in");
        this.router.navigate(['profile-instructor']);
      } else {
        console.log("Logged out");
      }
    })
  }
  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['profile-instructor']);

    });
  }

  signInWithEmail() {
    this.isVisible = true;
    this.authService.signInWithEmail(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      // navigate to user profile
      this.isVisible = false; 
      this.signInForm.reset();
    })
    .catch(async error => {
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })

      toast.present()

    });
    
    this.signInForm.reset();
  }

}
