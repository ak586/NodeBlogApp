const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        }).catch((err) => { console.log(err); })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog detail' });
        }).catch((err) => { console.log(err); });
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create new blog' });
}

const blog_create_post = (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        }).catch((err) => { console.log(err) });
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_update_get = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.render('update', { blog: blog, title: 'Update blog' });
}

const blog_update_put = async (req, res) => {
    console.log("inside the put request");
    const id = req.params.id;
    const { title, snippet, body } = req.body;
    const newBlog = { title, snippet, body };
    console.log(req.body);
    await Blog.findByIdAndUpdate(id, newBlog);
    res.redirect(`/blogs/${id}`)
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update_get,
    blog_update_put,
};
