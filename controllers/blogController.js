// All the logic lies in the controller file
const Blog = require('../models/blog');


// blog_index (GET): to get all the blogs
const blog_index = (req,res) => {
    Blog.find().sort({ createdAt: -1})
    .then((result)=>{
        res.render('blogs/index', { title: 'All Blogs', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    })
}

// blog_details (GET): to get details of a single blog with id
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        console.log(result);
        res.render('blogs/details', { title: 'Blog Details', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    })
}

// blog_create_get (GET): page to create a new blog
const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'create a new Blog' });
}

// blog_create_post (POST): post request to post a new blog into db
const blog_create_post = (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
}

// blog_delete (DELETE): to delete a blog
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({
            redirect: '/blogs'
        })
    })
    .catch((err)=>{ 
        console.log(err);
    });
}
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete

}
