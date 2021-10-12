import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email = ""
  password = ""
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle
  constructor(private authService: AuthService, private router: Router,
              private socialService: SocialAuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email,Validators.required]),
      'password': new FormControl(null, Validators.required)
    })
  }


  onGoogleSignIn(){
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.authService.googleSignIn(user.idToken).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/home']);
      }, 
      (err) => {
        console.log(err)
      })
    });
  }

  

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  onLogin(){
    this.clearErrorMessage();
    this.authService.loginWithEmail(this.loginForm.get('email').value, this.loginForm.get('password').value)
        .then(() => {
         this.router.navigate(['/home'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/login'])
        })
  }

  validateForm(email, password){
/*     if(email.lenght === 0)
    {
      this.errorMessage = "please enter email id";
      return false;
    } */

    if (password.lenght === 0) {
      this.errorMessage = "please enter password";
      return false;
    }

    if (password.lenght < 6)
    {
      this.errorMessage = "password should be at least 6 char";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
