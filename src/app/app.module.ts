import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DiscussionFormComponent } from './discussion-form/discussion-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DiscussionPostComponent } from './discussion-post/discussion-post.component';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormService } from './form.service';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { reviewscomponent } from './reviews/reviews.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';


const appRoutes: Routes = [ {
  path: '',  //default component to display
  component: HomePageComponent, pathMatch: 'full' 
}, {
  //Daniel Routes
  path: 'previousPosts',  
  component: DiscussionPostComponent
}, {
  path: 'postForm',  
  component: DiscussionFormComponent
}, 
{
  path: 'editPost/:_id', 
  component: DiscussionFormComponent 
},{

  //Tommy Routes
  path: 'editStudent/:_id', //when students edited 
  component: ReadingListComponent 
}, {
  path: 'addStudent',  //when students added 
  component: ReadingListComponent
}, {
  path: 'listStudents',  //when students listed
  component: ReadingListComponent
},

{
  ///Devin Routes
  path: 'listReviews',  //when students listed
  component: reviewscomponent
},
{
  path: 'addReview',  //when students listed
  component: reviewscomponent
},
{
  path: 'editReview/:_id',  //when students listed
  component: reviewscomponent
},

///////Bilkis Routes 
{
  path: 'listRecommendations',  //when students listed
  component: RecommendationsComponent
},
{
  path: 'addRecommendation',  //when students listed
  component: RecommendationsComponent
},
{
  path: 'editRecommendation/:_id',  //when students listed
  component: RecommendationsComponent
},

{
  path: '**',  //when path cannot be found
  component: NotFoundComponent
},
];







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DiscussionFormComponent,
    DiscussionPostComponent,
    ReadingListComponent,
    NotFoundComponent,
    HomePageComponent,
    reviewscomponent,
    RecommendationsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
