const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const reviewSchema = new mongoose.Schema({
    genre:  { type: String, },
    readingLevel:  { type: String, },
    favoriteAuthor:  { type: String, }
   
});


//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Review', reviewSchema,'reviews');
