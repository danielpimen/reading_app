import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service'

@Component({
  selector: 'app-discussion-post',
  templateUrl: './discussion-post.component.html',
  styleUrls: ['./discussion-post.component.css']
})
export class DiscussionPostComponent implements OnInit {

  public posts : any;

  constructor(private _myService: FormService) { }

  ngOnInit(){
    this.getPosts();
  }

  getPosts(){
    this._myService.getPosts().subscribe(
    //read data and assign to public variable students
    data => { this.posts = data},
    err => console.error(err),
    () => console.log('finished loading posts')
    );

  }

  likePost(){
    console.log('Send Update to MongoDB to update post record to have +1 like')
  }

  replyPost(){
    console.log('Link to send user to discussion board create route')

  }

  onDelete(postId: string) {
    this._myService.deletePost(postId);
}

  updatePost(){
    console.log('Update')
  }

}
