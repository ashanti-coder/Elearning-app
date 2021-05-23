import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase/app';

import { AngularFirestore, 
  AngularFirestoreCollection,
   AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  windowRef;

  constructor(private afa: AngularFireAuth) { }

  async logingWithFacebook(){
		return this.afa.signInWithPopup(new firebase.auth.FacebookAuthProvider());
	}

  getWindowRef(){
		return window;
	}

	async signInWithPhone(phoneNumber, recaptchaContainer){
		firebase.auth().languageCode = 'eng';
		this.windowRef = this.getWindowRef();

		this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaContainer, {
			'size': 'normal'
		});

		this.windowRef.recaptchaVerifier.render();

		return this.afa.signInWithPhoneNumber(phoneNumber, this.windowRef.recaptchaVerifier);
	}

	confirmOTP(otp, confirmationResult){
		return confirmationResult.confirm(otp);
	}


}
