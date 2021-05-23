import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from "@angular/forms";
import { LoadingController, ToastController } from '@ionic/angular';
import { Account } from 'src/app/Model/account.model';
import { StudentService } from 'src/app/services/Student-Service/student.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userAccount: Account;
  
  load:boolean;

  public loginInvalid: boolean;
  signInForm: FormGroup;
  submitError: string;

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

  isVisible: boolean = false;


  constructor(
    private studentDao:StudentService,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController, private toastController: ToastController) {
      
      
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
     }
     ngOnInit() {
      this.form = this.fb.group({
        username: ['', Validators.email],
        password: ['', Validators.required]
      });
  }   
  signInWithEmail() {

    this.isVisible = true;
    
  
    this.studentDao.SignIn(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      this.isVisible = false;
    })
    .catch(async error => {
      let toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger",
      })

      toast.present()

    });
  }
 
}
 


