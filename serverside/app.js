const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const request = require('request');
const axios = require('axios');


const mongoose = require('mongoose');
//specify where to find the schema
const Post = require('./models/post')
const Book = require('./models/books')
const Review = require('./models/review')
const Recommendation = require('./models/recommendation')

//https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey
//API Key 
apiKey = 'ZO2a5XB5OTtcG3gKGBO0ddwWuXIA7hnp'

//ID: s-readingapp
//Password: 2Jh625Kr
//connect and display the status 
//mongodb+srv://s-readingapp:<password>@readingapp.muleg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://s-readingapp:2Jh625Kr@readingapp.muleg.mongodb.net/ReadingApp?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true })

//mongoose.connect('mongodb://localhost:27017/reading_app', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

///////////API Call 

app.get('/api_test', (req, res, next) => {
    //we will add an array named students to pretend that we received this data from the database
    const students = [ 
    { "id" : "1", "firstName" : "John" , "lastName" : "Dow" }, 
    { "id" : "2", "firstName" : "Ann" , "lastName" : "Smith" }, 
    { "id" : "3", "firstName" : "Joan" , "lastName" : "Doe" }];
    //send the array as the response 
    res.json(students);

});

//API Call for current best nonfiction
app.get('/api_nonfictionSellers', (req, res, next) => {

    //Grab top sellers show on home screen - Author Stephen King
    axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=ZO2a5XB5OTtcG3gKGBO0ddwWuXIA7hnp')
      .then((response) => {
        
        data = response.data.results.books

        //res.json(data)
        bookArray = []
        
    
        for(var i = 0; i < data.length; i++){
            let obj = {}
    
            console.log(data[i].title)
            console.log(data[i].description)
            // title = data[i].title 
            obj["title"] = data[i].title
            obj["author"] = data[i].author
            obj["description"] = data[i].description
            bookArray.push(obj)
        }

        res.json(bookArray)

      });
    });


//API Call for Current Best Hard-cover fiction 
app.get('/api_currentSellers', (req, res, next) => {

    //Grab top sellers show on home screen - Author Stephen King
    axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=ZO2a5XB5OTtcG3gKGBO0ddwWuXIA7hnp')
      .then((response) => {
        
        data = response.data.results.books

        //res.json(data)
        bookArray = []
        
    
        for(var i = 0; i < data.length; i++){
            let obj = {}
    
            console.log(data[i].title)
            console.log(data[i].description)
            // title = data[i].title 
            obj["title"] = data[i].title
            obj["author"] = data[i].author
            obj["description"] = data[i].description
            bookArray.push(obj)
        }

        res.json(bookArray)

      });
    });


//API Call to get Stephen King Best Sellers 
app.get('/api_stephenKing', (req, res, next) => {

//Grab top sellers show on home screen - Author Stephen King
axios.get('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?author=Stephen%20king&api-key=ZO2a5XB5OTtcG3gKGBO0ddwWuXIA7hnp')
  .then((response) => {
    
    data = response.data.results
    // var nietos = [];
    // var obj = {};
    // obj["01"] = nieto.label;
    // obj["02"] = nieto.value;
    // nietos.push(obj);

    authorArray = []
    

    for(var i = 0; i < data.length; i++){
        let obj = {}

        console.log(data[i].title)
        // title = data[i].title 
        obj["title"] = data[i].title
        obj["description"] = data[i].description
        obj["link"] = data[i].reviews[0].book_review_link
        console.log(data[i].description);
        // description = data[i].description
        console.log(data[i].reviews[0].book_review_link);
        // link = data[i].reviews[0].book_review_link   
        authorArray.push(obj)
    }
    // console.log(response.data.results[0].title);
    // console.log(response.data.results[0].description);
    // console.log(response.data.results[0].reviews[0].book_review_link);
    // title = response.data.results[0].title
    // description = response.data.results[0].description
    // link = response.data.results[0].reviews[0].book_review_link


    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    res.json(authorArray)
  });
});


///////////Daniel's Portion 
app.get('/test', (req, res, next) => {
    //we will add an array named students to pretend that we received this data from the database
    const students = [ 
    { "id" : "1", "firstName" : "John" , "lastName" : "Dow" }, 
    { "id" : "2", "firstName" : "Ann" , "lastName" : "Smith" }, 
    { "id" : "3", "firstName" : "Joan" , "lastName" : "Doe" }];
    //send the array as the response 
    res.json(students);

});



app.get('/posts', (req, res, next) => {
    Post.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});

});

//serve incoming post requests to /posts
app.post('/posts', (req, res, next) => {
    const post = new Post({
        name: req.body.name,
        readingLevel: req.body.readingLevel,
        postText : req.body.postText,
        likes : 0
        
    });
    //send the document to the database 
    post.save()
        //in case of success
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error:' + err);});
});

app.delete("/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.put('/posts/:id', (req, res, next) => { 
    console.log("id: " + req.params.id)
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        Post.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                name : req.body.name, 
                readingLevel : req.body.readingLevel,
                postText : req.body.postText
            }}, 
            {new:true} 
        ) 
        .then((post) => { 
            if (post) { //what was updated 
                console.log(post); 
            } else { 
                console.log("No information"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("Wrong Id"); 
    } 
});


/////////Tommy's Portion

app.get('/books', (req, res, next) => {
    //we will add an array named students to pretend that we received this data from the database
//call mongoose method find (MongoDB db.Students.find())
Book.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});
});

//serve incoming post requests to /students
app.post('/books', (req, res, next) => {
// create a new student variable and save request’s fields 
const book = new Book({
    bookTitle: req.body.bookTitle,
    bookAuthor: req.body.bookAuthor,
    readStatus: req.body.readStatus,
});
//send the document to the database 
book.save()
    //in case of success
    .then(() => { console.log('Success');})
    //if error
    .catch(err => {console.log('Error:' + err);});
});


//:id is a dynamic parameter that will be extracted from the URL
app.delete("/books/:id", (req, res, next) => {
    Book.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /students 
app.put('/books/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Book.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                bookTitle: req.body.bookTitle,
                bookAuthor: req.body.bookAuthor,
                readStatus: req.body.readStatus,
            }}, 
            {new:true} 
        ) 
        .then((book) => { 
            if (book) { //what was updated 
                console.log(book); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    }
    
});

///////////Devin's Portion
app.get('/reviews', (req, res, next) => {
    Review.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});
});

app.post('/reviews', (req, res, next) => {
    const review = new Review({
        genre: req.body.genre,
        readingLevel: req.body.readingLevel,
        favoriteAuthor: req.body.favoriteAuthor,
    });
    review.save()
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error:' + err);});
});

app.delete("/reviews/:id", (req, res, next) => {
    Review.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.put('/reviews/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    console.log(req.body.genre)
    console.log(req.body.readingLevel)
    console.log(req.body.favoriteAuthor)
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        Review.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                genre: req.body.genre,
                readingLevel: req.body.readingLevel,
                favoriteAuthor: req.body.favoriteAuthor,
            }}, 
            {new:true} 
        ) 
        .then((review) => { 
            if (review) { //what was updated 
                console.log(review); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    }
    
});

    ///////////Bilkis' Portion
    app.get('/recommendations', (req, res, next) => {
        Recommendation.find() 
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});

app.post('/recommendations', (req, res, next) => {
    const recommendation = new Recommendation({
        bookTitle: req.body.bookTitle,
        authorName: req.body.authorName,
        firstName: req.body.firstName,
        lastName : req.body.lastName, 
    });
    recommendation.save()
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error:' + err);});
});

app.delete("/recommendations/:id", (req, res, next) => {
    Recommendation.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.put('/recommendations/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        Recommendation.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                bookTitle: req.body.bookTitle,
                authorName: req.body.authorName,
                firstName: req.body.firstName,
                lastName : req.body.lastName,
            }}, 
            {new:true} 
        ) 
        .then((recommendation) => { 
            if (recommendation) { //what was updated 
                console.log(recommendation); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    }
    
});























//to use this middleware in other parts of the application
module.exports=app;