import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.testUser();
  }

  UserName: any;
  UserDisplayName: any;

  testUser(){
    if(this.authService.currentUser){
      this.UserName = this.authService.currentUserName
      this.UserDisplayName = this.authService.currentUserDisPlayName,
      console.log(this.UserName)
      console.log(this.UserDisplayName)
    }
    else{
      this.UserName = '';
      this.UserDisplayName= '';
      console.log(this.UserName)
      console.log(this.UserDisplayName)
    }
  }

  profileForm: FormGroup
  private initForm(){
     this.profileForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl({ value: '', disabled: true }, Validators.required)
    });

    setTimeout(() => {
      this.profileForm.patchValue({
        displayName: this.UserDisplayName,
        email: this.UserName
      })
    },500)
  
  }

  onSaveUser(user: User): void{
    this.authService.UpdateProfile(user)
  }

}
