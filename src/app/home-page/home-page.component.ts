import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormService } from '../form.service';
import {ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  constructor(private _myService: FormService,private router:Router, public route: ActivatedRoute) { }
  public books: any;
  public sellers : any;
  public nonfictions : any;

  ngOnInit(){
    this.getStephenKing();
    this.getBestSellers();
    this.getNonfictionSellers();
  }

  getStephenKing() {
    this._myService.getStephenKing().subscribe(
        data => { this.books = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
  }

  getBestSellers(){
    this._myService.getBestSellers().subscribe(
      data => { this.sellers = data},
      err => console.error(err),
      () => console.log('finished loading')
  );

  }

  getNonfictionSellers(){
    this._myService.getNonfictionSellers().subscribe(
      data => { this.nonfictions = data},
      err => console.error(err),
      () => console.log('finished loading')
    );  

  }

}
