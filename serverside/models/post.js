const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const postSchema = new mongoose.Schema({
    name:  { type: String, },
    readingLevel:  { type: String, },
    postText:  { type: String, },
    likes: {type : Number}
   
});


//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Post', postSchema,'posts');
