import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { User } from "./user.interface";
import * as firebase from 'firebase/app';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, config } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  
    authState: any = null
    constructor(private afu: AngularFireAuth, private router: Router, private http: HttpClient) {
        this.afu.authState.subscribe((auth) => {
            this.authState = auth;
        })
        
    }

      // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUserDisPlayName(): string {
    return this.authState['displayName']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  async UpdateProfile(user: User) {
    const profile = {
        displayName: user.displayName,
        phoneNumber: user.phoneNumber
    }
    return (await this.afu.currentUser).updateProfile(profile).then((result) => {
      console.log('Worked');
    });
}

    registerWithEmail(email: any, password: string){
        return this.afu.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user
        })
        .catch(error => {
          console.log(error)
          throw error
        });
    }

    loginWithEmail(email: any, password: string)
    {
      return this.afu.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user
        })
        .catch(error => {
          console.log(error)
          throw error
        });
    }

    API_KEY = 'AIzaSyDGiKOICB6hrEsI_s6HKzq2dx7yTuSCYzw';

    googleSignIn(idToken){
        return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${this.API_KEY}`,{
          postBody: `id_token=${idToken}&providerId=google.com`,
          requestUri:'http://localhost:4200',
          returnIdpCredential:true,
          returnSecureToken:true
        }).pipe(
          tap(res => {
            this.getUserData(res.idToken)
          })
        )
    }

    singout(): void
    {
      this.afu.signOut();
      this.router.navigate(['/login']);
    }

    user = new BehaviorSubject<User>(null);
    profileInfo = new BehaviorSubject({
      displayName: '',
      email: '',
      photoURL: ''
    });
    getUserData(token){
      this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.API_KEY}`,{
        idToken: token
      }).subscribe((res) => {
          this.profileInfo.next({
            displayName: res.users[0].displayName,
            email: res.users[0].email,
            photoURL: res.users[0].photoUrl
          })
      })
    }
  
}