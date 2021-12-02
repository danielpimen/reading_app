import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormService } from '../form.service';
import {ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-discussion-form',
  templateUrl: './discussion-form.component.html',
  styleUrls: ['./discussion-form.component.css']
})
export class DiscussionFormComponent{

  @Input() name: string='';
  @Input() readingLevel: string='';
  @Input() postText: string='';

  public mode = 'Add'; //default mode
  private id: any; 


  constructor(private _myService: FormService, public route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id'))
            { this.mode = 'Edit'; /*request had a parameter _id */ 
            this.id = paramMap.get('_id');}
        else {this.mode = 'Add';
            this.id = null; }
    });
}

  discussionForm = new FormGroup({
    name: new FormControl(''),
    readingLevel: new FormControl(''),
    postText: new FormControl(''),

  });
  onSubmit() {
    // console.log(this.name)
    // console.log(this.discussionForm)
    console.warn(this.discussionForm.value.name)
    console.warn(this.discussionForm.value.readingLevel)
    console.warn(this.discussionForm.value.postText)

    if (this.mode == 'Add')
    this._myService.addPosts(this.discussionForm.value.name ,this.discussionForm.value.readingLevel, this.discussionForm.value.postText);
    if (this.mode == 'Edit')
    this._myService.updatePosts(this.id , this.discussionForm.value.name,this.discussionForm.value.readingLevel, this.discussionForm.value.postText);
    

  }

  



}
