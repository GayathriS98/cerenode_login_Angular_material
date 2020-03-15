import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { BarchartComponent } from './barchart/barchart.component';

// import { ModuleWithProviders } from '@angular/core';
// import { SocialLoginModule,AuthServiceConfig } from 'angular4-social-login'; 
// import { GoogleLoginProvider,FacebookLoginProvider } from 'angular4-social-login'; 

// let config= new AuthServiceConfig([
//   {
//     id:GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("532435943119-2dvedajhbittvo64fcmae59p3tc45kbr.apps.googleusercontent.com")
//   }
// ])


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,BarchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // SocialLoginModule.initialize(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
