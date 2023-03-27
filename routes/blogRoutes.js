const express= require('express');
// new instance of router object
const router = express.Router();
//importing controller function
const blogController = require('../controllers/blogController');


// GET request:
router.get('/', blogController.blog_index);

// GET : create blog page
router.get('/create', blogController.blog_create_get);

// GET : single blog
router.get('/:id', blogController.blog_details);

// POST request: to post data into db
router.post('/', blogController.blog_create_post);

// DELETE request:
router.delete('/:id', blogController.blog_delete);




// mongoose and mongo sandbox routes example: 
/* -------------- Databse Routes -------------------/
app.get('/add-blog', (req,res)=>{
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    // to save documents to db
    blog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});
// getting all blog
app.get('/all-blog', (req,res)=>{
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});
// getting single blog
app.get('/single-blog', (res,req)=>{
    Blog.findById()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

*/
module.exports = router;
