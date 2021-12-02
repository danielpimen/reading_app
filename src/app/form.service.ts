import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FormService {

    constructor(private http:HttpClient) {}

    //API Functions 
    //Get Stephen King Best Seller Details 
    getStephenKing(){
        return this.http.get('http://localhost:8000/api_stephenKing')
    }

    //Get Function to get fiction best sellers
    getBestSellers(){
        return this.http.get('http://localhost:8000/api_currentSellers')
    }


    getNonfictionSellers(){
        return this.http.get('http://localhost:8000/api_nonfictionSellers')

    }


    //Get for Posts
    getPosts(){
        return this.http.get('http://localhost:8000/posts')
    }


    addPosts(name: string, readingLevel: string, postText : string,) {
        this.http.post('http://localhost:8000/posts',{ name, readingLevel, postText})
            .subscribe((responseData) => {
                console.log(responseData);
        }); 
        location.reload();
    }

    deletePost(postId: string) {
        this.http.delete("http://localhost:8000/posts/" + postId)
            .subscribe(() => {
                console.log('Deleted: ' + postId);
            });
            location.reload();
    }
          

    updatePosts(postId: string,name: string, readingLevel: string, postText : string) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/posts/" + 
        postId,{ name, readingLevel, postText })
        .subscribe(() => {
            console.log('Updated: ' + postId);
        });
        location.reload();
    }

    getStudents() {
        return this.http.get('http://localhost:8000/books');
    }


    ////////Tommy Functions 
     
    addStudents(bookTitle: string, bookAuthor: string, readStatus: string) {
    this.http.post('http://localhost:8000/books',{ bookTitle, bookAuthor, readStatus })
        .subscribe((responseData) => {
            console.log(responseData);
        });
        location.reload(); 
    }

    deleteStudent(studentId: string) {
        this.http.delete("http://localhost:8000/books/" + studentId)
            .subscribe(() => {
                console.log('Deleted: ' + studentId);
            });
            location.reload();
            
    }

    updateStudent(studentId: string,bookTitle: string, bookAuthor: string, readStatus: string) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/books/" + 
        studentId,{ bookTitle, bookAuthor, readStatus })
        .subscribe(() => {
            console.log('Updated: ' + studentId);
        });
        location.reload();
    }

    ///Devin Functions 
    getReviews() {
        return this.http.get('http://localhost:8000/reviews');
    }

    addReviews(genre: string, readingLevel: string, favoriteAuthor: string) {
        this.http.post('http://localhost:8000/reviews',{ genre, readingLevel, favoriteAuthor})
            .subscribe((responseData) => {
                console.log(responseData);
            });
            location.reload(); 
        }

    deleteReviews(reviewId: string) {
        this.http.delete("http://localhost:8000/reviews/" + reviewId)
            .subscribe(() => {
                console.log('Deleted: ' + reviewId);
            });
            location.reload();
                
    }

    updateReviews(reviewId : string, genre: string,readingLevel: string, favoriteAuthor: string) { 
        console.log(reviewId, genre, readingLevel, favoriteAuthor)
        this.http.put("http://localhost:8000/reviews/" + 
        reviewId,{ genre, readingLevel, favoriteAuthor})
        .subscribe(() => {
            console.log('Updated: ' + reviewId);
        });
        location.reload();
    }


    /////Bilkis Functions 
    getRecommendations() {
        return this.http.get('http://localhost:8000/recommendations');
    }

    addRecommendations(bookTitle: string, authorName: string, firstName: string, lastName : string) {
        this.http.post('http://localhost:8000/recommendations',{ bookTitle, authorName, firstName, lastName})
            .subscribe((responseData) => {
                console.log(responseData);
            });
            location.reload(); 
        }

    deleteRecommendation(recommendationId: string) {
            this.http.delete("http://localhost:8000/recommendations/" + recommendationId)
                .subscribe(() => {
                    console.log('Deleted: ' + recommendationId);
                });
                location.reload();
                    
        }
    updateRecommendations(recommendationId : string, bookTitle: string,authorName: string, firstName: string, lastName : string,) { 
        console.log(recommendationId, bookTitle, authorName, firstName, lastName)
        this.http.put("http://localhost:8000/recommendations/" + 
        recommendationId,{ bookTitle, authorName, firstName, lastName})
        .subscribe(() => {
            console.log('Updated: ' + recommendationId);
        });
        location.reload();
        }    


}