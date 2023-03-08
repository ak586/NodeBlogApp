const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

app.set('view engine', 'ejs');

dbURI = "mongodb+srv://netninja:test1234@cluster0.zfenadv.mongodb.net/note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { app.listen(3001) })
    .catch((err) => console.log("error"));
app.use(morgan('dev'));

//linking static files like css
//these files will be publid to the frontend
app.use(express.static('public'));

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about new blog',
        body: 'more about new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => { console.log(err); });
})

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => { console.log(err); });
})

app.get("/single-blog", (req, res) => {
    Blog.findById('64086996fc807b1840ddc5cf')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => { console.log(err); });
})


app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshie finds eggs', snippet: 'Lorem, ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem, ipsum dolor sit amet consectetur' },
        { title: 'how to defeat bowser', snippet: 'Lorem, ipsum dolor sit amet consectetur' }

    ]
    res.render('index', { title: "Home", blogs });
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog' });
})
app.use((req, res) => {
    res.render('404', { title: 'page not found' });
})