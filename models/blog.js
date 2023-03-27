const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema defines the structure of our data model
// this creates a new instance of a schema object
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });


// model surrounds the schema and provides as interface 
// - by which we can communicate with the database collection 
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;