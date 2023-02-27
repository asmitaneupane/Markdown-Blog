const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override')
const app = express();
app.use(express.static(__dirname + '/public'))

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
    // , useCreateIndex: true
});

// use view engine
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
//underscore helps to override the method
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    // res.send('Hello There!')
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles })
})

// bcz it comes after eth else
app.use('/articles', articleRouter);

app.listen(5000);