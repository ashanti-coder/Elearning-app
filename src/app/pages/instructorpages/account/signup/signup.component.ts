import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/Student-Service/student.service';
import { StudentInfo } from 'src/app/Model/Student-Model/student_Info';
import { AngularFireAuth } from '@angular/fire/auth';
import { InstructorService } from 'src/app/services/Instructor-Service/instructor.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  instructor = {} as StudentInfo;
  submitError: string;
  signUpForm: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' },
    ],
    'gender': [
      { type: 'required', message: 'gender is required.' },
    ],
    'phone': [
      { type: 'required', message: 'phone number is required.'},
      { type: 'minlength', message: 'Phone number must be 10 numbers long.' },
      { type: 'maxlength', message: 'Phone number must not exceed 10 numbers.' },
      
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };
  constructor(public loadingCtrl: LoadingController,     private auth: AngularFireAuth,

        private studentDao:InstructorService) { 
    this.signUpForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'surname': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'gender': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'phone': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    }); 
  }
  ngOnInit() {
    this.signUpForm.reset();
  }
  signUpWithEmail() {
    this.presentLoading("Registering acccount....");
    this.studentDao.RegisterUser(
      this.signUpForm.value['name'],
      this.signUpForm.value['surname'],
      this.signUpForm.value['gender'],
      this.signUpForm.value['phone'],
      this.signUpForm.value['email'], 
      this.signUpForm.value['password'])
    .then(user => {
      this.loadingCtrl.dismiss();
      this.auth.signOut();
      this.signUpForm.reset();  
    })
    .catch(error => {
      this.submitError = error.message;
    });
  }
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 10 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

async presentLoading(msg:string) {
  const loader = this.loadingCtrl.create({
    message: msg,
  });
  (await loader).present();
}
}
