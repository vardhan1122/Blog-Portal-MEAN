const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

/*
    Usage : GET all Blogs
    URL : http://127.0.0.1:5000/api/blogs
    Fields : no-fields
    Method : GET
 */
router.get('/blogs', async (request , response) => {
    try {
            let blogs = await Blog.find().sort({$natural:-1}); //.sort({$natural:-1});this is stored based on time and displayed based on time(LIFO)-LAST IN FIRST OUT.;
            response.status(200).json(blogs);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({msg : err.message});
    }
});

/*
    Usage : GET a single Blog
    URL : http://127.0.0.1:5000/api/blogs/:id
    Fields : no-fields
    Method : GET
 */
router.get('/blogs/:id', async (request , response) => {
    let blogId = request.params.id;
    try {
        let blog = await Blog.findById(blogId);
        response.status(200).json(blog);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({msg : err.message});
    }
});

/*
    Usage : CREATE a new Blog
    URL : http://127.0.0.1:5000/api/blogs/
    Fields : name , image , price , qty , info
    Method : POST
 */
router.post('/blogs/', async (request , response) => {
    let newBlog = {
        name : request.body.name,
        image : request.body.image,
        heading : request.body.heading,
        info : request.body.info,
        dataUrl : request.body.dataUrl
    };
    try {
        // check for an existing blog with same name
        let blog = await Blog.findOne({name : newBlog.name});
        if(!blog){
            let blog = new Blog(newBlog);
            blog = await blog.save(); // save the blog to database
            response.status(200).json(blog);
        }
        else{
            response.status(400).json({
                msg : 'Blog is Already Exists'
            });
        }
    }
    catch (err) {
        console.error(err);
        response.status(500).json({msg : err.message});
    }
});

/*
    Usage : UPDATE an existing Blog
    URL : http://127.0.0.1:5000/api/blogs/:id
    Fields : name , image , price , qty , info
    Method : PUT
 */
router.put('/blogs/:id', async (request , response) => {
    let blogId = request.params.id;
    let updatedBlog = {
      name : request.body.name,
      image : request.body.image,
      heading : request.body.heading,
      info : request.body.info,
      dataUrl : request.body.dataUrl
    };
    try {
        let blog = await Blog.findById(blogId);
        if(blog){
            blog = await Blog.findByIdAndUpdate(blogId , {
                $set : updatedBlog
            }, {new : true});
            response.status(200).json(blog);
        }
        else{
            response.status(500).json({
                msg : 'Blog is Not Updated'
            });
        }
    }
    catch (err) {
        console.error(err);
        response.status(500).json({msg : err.message});
    }
});

/*
    Usage : DELETE an existing Blog
    URL : http://127.0.0.1:5000/api/blogs/:id
    Fields : no-fields
    Method : DELETE
 */
router.delete('/blogs/:id', async (request , response) => {
    let blogId = request.params.id;
    try {
        let blog = await Blog.findByIdAndDelete(blogId);
        response.status(200).json(blog);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({msg : err.message});
    }
});

module.exports = router;
