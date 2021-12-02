const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const recommendationSchema = new mongoose.Schema({
    bookTitle:  { type: String, },
    authorName:  { type: String, },
    firstName:  { type: String, },
    lastName:  { type: String, },
   
});


//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Recommendation', recommendationSchema,'recommendations');
