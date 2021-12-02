import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormService } from '../form.service';
import {ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent {
  public students: any;
  readingForm = new FormGroup({
    bookTitle: new FormControl(''),
    bookAuthor: new FormControl(''),
    readStatus: new FormControl(''),
  });

  public mode = 'Add'; //default mode
  private id: any; //student ID

  onSubmit() {
    console.warn(this.readingForm.value);
    if (this.mode == 'Add')
    this._myService.addStudents(this.readingForm.value.bookTitle ,this.readingForm.value.bookAuthor, this.readingForm.value.readStatus);
    if (this.mode == 'Edit')
    this._myService.updateStudent(this.id,this.readingForm.value.bookTitle ,this.readingForm.value.bookAuthor, this.readingForm.value.readStatus);
    
  }

  constructor(private _myService: FormService,private router:Router, public route: ActivatedRoute
    ) { }

ngOnInit(){
  this.getStudents();
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id'))
            { this.mode = 'Edit'; /*request had a parameter _id */ 
            this.id = paramMap.get('_id');}
        else {this.mode = 'Add';
            this.id = null; }
    });
}
getStudents() {
  this._myService.getStudents().subscribe(
      //read data and assign to public variable students
      data => { this.students = data},
      err => console.error(err),
      () => console.log('finished loading')
  );
}

onDelete(studentId: string) {
this._myService.deleteStudent(studentId);
}
}