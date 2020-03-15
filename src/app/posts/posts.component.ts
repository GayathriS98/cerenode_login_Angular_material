import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
name;
id;
userPost=[];
caption=[];
  constructor(private http:HttpClient) {
    this.name=localStorage.getItem("username");
    console.log(name)
    this.id=localStorage.getItem("id");
    this.http.get(`http://5e6b26a40f70dd001643c279.mockapi.io/login/userDetails/${this.id}/posts`)
    .subscribe((val)=>{
      console.log(val)
      for(let i=0;i<Object.keys(val).length;i++){
       this.userPost.push(val[i].post);
       this.caption.push(val[i].caption);
      }
      console.log(this.caption)
    })
   }

  ngOnInit(): void {
  }

}
