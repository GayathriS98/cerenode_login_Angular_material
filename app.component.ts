import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

import { Observable } from 'rxjs';
import { DataModel } from './barchart/barchart.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {
    localStorage.clear();
  }
  

}
