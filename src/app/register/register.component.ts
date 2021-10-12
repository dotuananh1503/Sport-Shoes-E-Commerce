import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ConfirmPasswordValidator} from './must-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerForm: FormGroup;
  email = ""
  password = ""
  message = '';
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      repassword: ['', Validators.required]
    })
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  onRegister(){
    this.clearErrorMessage();
    this.authService.registerWithEmail(this.registerForm.get('email').value, this.registerForm.get('password').value)
      .then(() => {
        this.message = "Bạn đã đăng ký tài khoản thành công trên firebase"
        //this.router.navigate(['/home'])
      }).catch(_error => {
        this.error = _error;
        this.router.navigate(['/register'])
      })
  }

}
