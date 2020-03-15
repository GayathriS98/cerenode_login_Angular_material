import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { from } from 'rxjs';
var MaterialComponents=[
 MatToolbarModule,
 MatCardModule,
 MatFormFieldModule,
 MatInputModule,
 MatButtonModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents  
  ]
})
export class MaterialModule { }
