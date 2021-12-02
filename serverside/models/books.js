const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema
//const studentSchema = new mongoose.Schema({ 
const studentSchema = new mongoose.Schema({
    bookTitle:  { type: String, required: true},
    bookAuthor:  { type: String, required: true},
    readStatus:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Student', studentSchema,'books');
//note capital S in the collection name