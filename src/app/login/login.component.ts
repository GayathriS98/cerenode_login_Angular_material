import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl ,FormGroup,Validators} from '@angular/forms';
import { Router } from "@angular/router";
// import{ AuthService } from 'angular4-social-login';
// import {GoogleLoginProvider,FacebookLoginProvider} from "angular4-social-login";
// import { SocialUser } from 'angular4-social-login';
// import { from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'AngSocialMedia';
  // private user :SocialUser;
  // private loggedIn:boolean;


  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  
  loginForm;
  validated=false;
  constructor(private http:HttpClient,private router:Router,){
    // private authService:AuthService
    this.loginForm=new FormGroup(
      {
        "username":new FormControl('',Validators.required),
        "password":new FormControl('',Validators.required)
      }
    )
  }
  submit(){
    this.http.get("http://5e6b26a40f70dd001643c279.mockapi.io/login/userDetails")
    .subscribe((res)=>{
      let len=Object.keys(res).length
      for(let i=0;i<len;i++){
          if(this.loginForm.value.username===res[i].username){
            if(this.loginForm.value.password===res[i].password){
                console.log("hello user"+this.loginForm.value.username)
                this.validated=true;
                localStorage.setItem("Authorization","true");
                localStorage.setItem("id",res[i].id);
                localStorage.setItem("username",res[i].username)
                this.router.navigateByUrl("/home");
              }
              else{
                localStorage.setItem("Authorization","false");
                this.loginForm.controls['password'].reset();
              }
              
        }
      }
      
    })


  }
  // signIn(platform:string){
  //   this.authService.authState
  //   .subscribe((user)=>{
  //     this.user=user;
  //     this.loggedIn=(user !=null);
  //     console.log(this.user);
      
  //     localStorage.setItem("profilepic",user.photoUrl);
  //     localStorage.setItem("username",user.name);
  //     localStorage.setItem("email",user.email);
  //   })
  // }
  ngOnInit(): void {
    
  }

}
