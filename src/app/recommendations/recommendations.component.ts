import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormService } from '../form.service';
import {ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  bookRecommendation = new FormGroup({
    bookTitle: new FormControl(''),
    authorName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  }); 

  public mode = 'Add'; //default mode
  private id: any; 
  public recommendations: any;


  constructor(private _myService: FormService,private router:Router, public route: ActivatedRoute) { }

  ngOnInit(){
    this.getRecommendations();
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id'))
          { this.mode = 'Edit'; /*request had a parameter _id */ 
          this.id = paramMap.get('_id');}
      else {this.mode = 'Add';
          this.id = null; }
  });
    
  }

  onSubmit() {
    
    console.warn(this.bookRecommendation.value.bookTitle);
    console.warn(this.bookRecommendation.value.authorName);
    console.warn(this.bookRecommendation.value.firstName);
    console.warn(this.bookRecommendation.value.lastName);
    console.log('Submitted')
    if (this.mode == 'Add')
    this._myService.addRecommendations(this.bookRecommendation.value.bookTitle ,this.bookRecommendation.value.authorName, this.bookRecommendation.value.firstName, this.bookRecommendation.value.lastName);

    if (this.mode == 'Edit')
    this._myService.updateRecommendations(this.id, this.bookRecommendation.value.bookTitle ,this.bookRecommendation.value.authorName, this.bookRecommendation.value.firstName, this.bookRecommendation.value.lastName);

    
  }
  getRecommendations() {
    this._myService.getRecommendations().subscribe(
        //read data and assign to public variable students
        data => { this.recommendations = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
  }

  onDelete(recommendationId: string) {
    this._myService.deleteRecommendation(recommendationId);
    }
    

}
