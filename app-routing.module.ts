import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth.guard'
import { BarchartComponent } from './barchart/barchart.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  
  {
    path:'home',
    component:PostsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'home/dashboard',
    component:BarchartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
