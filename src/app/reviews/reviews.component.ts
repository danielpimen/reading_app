import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormService } from '../form.service';
import {ActivatedRoute, ParamMap, Router } from '@angular/router';



@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class reviewscomponent implements OnInit {
  public reviews : any;
  bookReview = new FormGroup({
    genre: new FormControl(''),
    readingLevel: new FormControl(''),
    favoriteAuthor: new FormControl('')

  });

  public mode = 'Add'
  private id : any;

  onSubmit() {
    
    console.warn(this.bookReview.value.genre);
    console.warn(this.bookReview.value.favoriteAuthor);
    console.warn(this.bookReview.value.readingLevel);
    if (this.mode == 'Add')
    this._myService.addReviews(this.bookReview.value.genre ,this.bookReview.value.readingLevel, this.bookReview.value.favoriteAuthor);
    if (this.mode == 'Edit')
    this._myService.updateReviews(this.id, this.bookReview.value.genre ,this.bookReview.value.readingLevel, this.bookReview.value.favoriteAuthor);
    
    
  }
  constructor(private _myService: FormService,private router:Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.getReviews()
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id'))
          { this.mode = 'Edit'; /*request had a parameter _id */ 
          this.id = paramMap.get('_id');}
      else {this.mode = 'Add';
          this.id = null; }
  });
  }

  getReviews() {
    this._myService.getReviews().subscribe(
        //read data and assign to public variable students
        data => { this.reviews = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
  }

  onDelete(reviewId: string) {
    this._myService.deleteReviews(reviewId);
    }

}
