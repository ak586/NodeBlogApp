const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require("./routes/blogRoutes");

app.set('view engine', 'ejs');

dbURI = "mongodb+srv://netninja:test1234@cluster0.zfenadv.mongodb.net/note-tuts?retryWrites=true&w=majority"
// dbURI = "mongodb://localhost:27017/note-tuts";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { app.listen(process.env.PORT || 5000) })
    .catch((err) => console.log("error"));
app.use(morgan('dev'));

//linking static files like css
//these files will be publid to the frontend
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.redirect("/blogs");
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.use('/blogs', blogRoutes);


app.use((req, res) => {
    res.render('404', { title: 'page not found' });
})
